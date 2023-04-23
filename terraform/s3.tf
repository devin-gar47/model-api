locals {
  dependencies_zip_path = "${path.module}/nodejs.zip"
}

resource "aws_s3_bucket" "deps" {
  bucket = "${var.project_name}-deps-bucket"
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.deps.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "deps_versioning" {
  bucket = aws_s3_bucket.deps.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_object" "deps_object" {
  bucket = aws_s3_bucket.deps.id
  key    = "nodejs"
  source = local.dependencies_zip_path

  source_hash = filemd5(local.dependencies_zip_path)
}