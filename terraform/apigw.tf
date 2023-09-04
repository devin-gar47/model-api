resource "aws_api_gateway_rest_api" "model_apigw" {
  name = "${var.project_name}-api-gateway"

  body = templatefile("${path.module}/openapi.json", {})

  depends_on = [aws_cloudwatch_log_group.apigw_log_group]
}

resource "aws_api_gateway_deployment" "apigw_deployment" {
  rest_api_id = aws_api_gateway_rest_api.model_apigw.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.model_apigw.body))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "test_stage" {
  deployment_id = aws_api_gateway_deployment.apigw_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.model_apigw.id
  stage_name    = "test"
}

resource "aws_cloudwatch_log_group" "apigw_log_group" {
  name              = "${var.project_name}-apigw"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_stream" "apigw_log_stream" {
  name           = "${var.project_name}-apigw-stream"
  log_group_name = aws_cloudwatch_log_group.apigw_log_group.name
}