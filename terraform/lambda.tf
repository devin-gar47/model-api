resource "aws_lambda_layer_version" "lambda_layer" {
  s3_bucket  = aws_s3_bucket.deps.id
  s3_key     = aws_s3_object.deps_object.key
  layer_name = "${var.project_name}-deps"
  skip_destroy = false

  source_code_hash = aws_s3_object.deps_object.key

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
}

resource "aws_iam_role_policy_attachment" "basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.iam_for_lambda_execution.name
}
resource "aws_iam_role" "iam_for_lambda_execution" {
  name               = "iam_for_lambda_execution"
  assume_role_policy = data.aws_iam_policy_document.invoke_lambda_policy.json
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.arn
  principal     = "apigateway.amazonaws.com"

  #--------------------------------------------------------------------------------
  # Per deployment
  #--------------------------------------------------------------------------------
  # The /*/*  grants access from any method on any resource within the deployment.
  # source_arn = "${aws_api_gateway_deployment.test.execution_arn}/*/*"

  #--------------------------------------------------------------------------------
  # Per API
  #--------------------------------------------------------------------------------
  # The /*/*/* part allows invocation from any stage, method and resource path
  # within API Gateway REST API.
  source_arn    = "${aws_api_gateway_rest_api.model_apigw.execution_arn}/*/*/*"
}

resource "aws_lambda_function" "api" {
  filename         = "${path.module}/app.zip"
  function_name    = "${var.project_name}-api"
  role             = aws_iam_role.iam_for_lambda_execution.arn
  handler          = "index.handler"
  layers           = [aws_lambda_layer_version.lambda_layer.arn]
  source_code_hash = filebase64sha256("${path.module}/app.zip")
  timeout = 180

  runtime = "nodejs18.x"

  depends_on = [
    aws_cloudwatch_log_group.lambda_log_group,
  ]

  environment {
    variables = {
      DATABASE_URL = var.db_url
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.project_name}-api"
  retention_in_days = 7
}



