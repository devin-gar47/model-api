data "template_file" "openapi_spec" {
    template = "${file("${path.module}/openapi.json")}"
}

resource "aws_api_gateway_rest_api" "name" {
    name = "model-project-api-gateway"

    body = data.template_file.openapi_spec.rendered
}