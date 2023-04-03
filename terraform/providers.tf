terraform {
  backend "remote" {
    organization = "looney-develops"
    workspaces {
      name = "model-api"
    }

  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.59.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}