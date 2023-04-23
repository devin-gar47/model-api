resource "aws_api_gateway_rest_api" "model_apigw" {
  name = "model-project-api-gateway"

  body = templatefile("${path.module}/openapi.json", {})
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