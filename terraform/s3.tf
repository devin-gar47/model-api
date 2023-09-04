locals {
  dependencies_zip_path = "${path.module}/nodejs.zip"
}

resource "aws_s3_bucket" "deps" {
  bucket = "${var.project_name}-deps-bucket"
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.deps.id
  acl    = "private"

  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
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

resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.deps.id
  rule {
    object_ownership = "ObjectWriter"
  }
}