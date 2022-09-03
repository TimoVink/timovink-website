terraform {
  cloud {
    organization = "timovink"

    workspaces {
      name = "tv-personalsite"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4"
    }
  }
}
