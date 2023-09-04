resource "aws_iam_role" "iam_for_lambda_execution" {
  name               = "iam_for_lambda_execution"
  assume_role_policy = data.aws_iam_policy_document.invoke_lambda_policy.json
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

resource "aws_iam_role_policy_attachment" "lambda_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.iam_for_lambda_execution.name
}

resource "aws_iam_role_policy_attachment" "dynamo_access" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role       = aws_iam_role.iam_for_lambda_execution.name
}

# resource "aws_iam_policy" "dynamodb_access" {
#   name = "${var.project_name}-api-dynamo-access"
#   policy = jsonencode(
#     {
#       "Version" : "2012-10-17",
#       "Statement" : [
#         {
#           "Effect" : "Allow",
#           "Action" : [
#             "dynamodb:BatchGetItem",
#             "dynamodb:GetItem",
#             "dynamodb:Query",
#             "dynamodb:Scan",
#             "dynamodb:BatchWriteItem",
#             "dynamodb:PutItem",
#             "dynamodb:UpdateItem"
#           ],
#           "Resource" : [
#             "${aws_dynamodb_table.user_table.arn}"
#           ]
#         }
#       ]
#     }
#   )
# }