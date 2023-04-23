resource "aws_api_gateway_rest_api" "model_apigw" {
  name = "model-project-api-gateway"

  body = templatefile("${path.module}/openapi.json", {})
}
