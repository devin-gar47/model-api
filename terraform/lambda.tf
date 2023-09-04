resource "aws_lambda_layer_version" "lambda_layer" {
  s3_bucket    = aws_s3_bucket.deps.id
  s3_key       = aws_s3_object.deps_object.key
  layer_name   = "${var.project_name}-deps"
  skip_destroy = false

  source_code_hash = aws_s3_object.deps_object.key

  compatible_runtimes = ["nodejs18.x"]
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.model_apigw.execution_arn}/*/*/*"
}

resource "aws_lambda_function" "api" {
  filename         = "${path.module}/app.zip"
  function_name    = "${var.project_name}-api"
  role             = aws_iam_role.iam_for_lambda_execution.arn
  handler          = "index.handler"
  layers           = [aws_lambda_layer_version.lambda_layer.arn]
  source_code_hash = filebase64sha256("${path.module}/app.zip")
  timeout          = 180

  runtime = "nodejs18.x"

  depends_on = [
    aws_cloudwatch_log_group.lambda_log_group,
  ]
  
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "${var.project_name}-lambda"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_stream" "foo" {
  name           = "lambda-stream"
  log_group_name = aws_cloudwatch_log_group.lambda_log_group.name
}

