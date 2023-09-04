resource "aws_dynamodb_table" "user_table" {
  name         = "User"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Username"

  point_in_time_recovery {
    enabled = true
  }

  attribute {
    name = "Username"
    type = "S"
  }

  tags = {
    Name = "${var.project_name}-user-table"
  }
}