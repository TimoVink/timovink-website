terraform {
  cloud {
    organization = "timovink"

    workspaces {
      name = "web-timovink"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.26.0"
    }
  }
}
