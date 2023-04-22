resource "aws_lambda_layer_version" "lambda_layer" {
  s3_bucket  = aws_s3_bucket.deps.id
  s3_key     = aws_s3_object.deps_object.key
  layer_name = "${var.project_name}-deps"

  compatible_runtimes = ["nodejs18.x"]
}

data "aws_iam_policy_document" "invoke_lambda_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }

  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.invoke_lambda_policy.json
}

resource "aws_iam_role_policy_attachment" "basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.iam_for_lambda.name
}

resource "aws_lambda_function" "api" {
  filename         = "${path.module}/app.zip"
  function_name    = "${var.project_name}-api"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "index.handler"
  layers           = [aws_lambda_layer_version.lambda_layer.arn]
  source_code_hash = filebase64sha256("${path.module}/app.zip")

  runtime = "nodejs18.x"

  depends_on = [
    aws_cloudwatch_log_group.lambda_log_group,
  ]

  environment {
    variables = {
      DATABASE_URL = aws_db_instance.database.address
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/model-project-api"
  retention_in_days = 7
}



