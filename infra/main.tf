provider "aws" {
  region = "us-west-2"

  default_tags {
    tags = {
      Project = "timovink-website"
    }
  }
}

provider "aws" {
  alias  = "global"
  region = "us-east-1"

  default_tags {
    tags = {
      Project = "timovink-website"
    }
  }
}


#
# Configuration
#

locals {
  domain_name = "timovink.dev"
}


#
# External Resources
#

data "aws_acm_certificate" "this" {
  provider = aws.global

  domain   = local.domain_name
  statuses = ["ISSUED"]
}

data "aws_route53_zone" "this" {
  name = "${local.domain_name}."
}


#
# New Resources
#

resource "aws_cloudfront_origin_access_identity" "this" {
}

resource "aws_s3_bucket" "static_assets" {
  bucket = "timovink.com"
}

data "aws_iam_policy_document" "static_assets" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_assets.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.this.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id
  policy = data.aws_iam_policy_document.static_assets.json
}

resource "aws_s3_bucket_server_side_encryption_configuration" "static_assets" {
  bucket = aws_s3_bucket.static_assets.bucket

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_cloudfront_function" "spa_redirect" {
  name    = "timovink-website-sparedirect"
  runtime = "cloudfront-js-1.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
        var request = event.request;
        var uri = request.uri;

        if (!uri.includes('.')) {
            request.uri = '/index.html';
        }

        return request;
    }
  EOF
}

resource "aws_cloudfront_distribution" "this" {
  enabled = true
  comment = local.domain_name
  aliases = [local.domain_name]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = "default"
    viewer_protocol_policy = "redirect-to-https"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_redirect.arn
    }

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }
  }

  origin {
    origin_id   = "default"
    domain_name = aws_s3_bucket.static_assets.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.this.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = true
  }
}
