resource "aws_api_gateway_rest_api" "model_apigw" {
  name = "model-project-api-gateway"

  body = templatefile("${path.module}/openapi.json", {})
}

resource "aws_iam_role" "invoke_lambda" {
  name = "apigw-lambda-role"
}

resource "aws_iam_policy_document" "apigw_invoke_lambda" {
  statement {
    effect = "Allow"

  principals {
    type = "Service"
    identifiers = ["lambda.amazonaws.com"]
  }

  actions = ["sts:AssumeRole"]
  }

  statement {
    effect = "Allow"

  principals {
    type = "Service"
    identifiers = ["apigateway.amazonaws.com"]
  }

  actions = ["sts:AssumeRole"]
  }
}