terraform {
  cloud {
    organization = "timovink"

    workspaces {
      name = "timovink-website"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.11"
    }
  }
}
