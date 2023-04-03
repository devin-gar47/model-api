data "aws_availability_zones" "available" {
  state = "available"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.19.0"

  name = "${var.project_name}-vpc"
  cidr = "10.0.0.0/16"

  azs             = [data.aws_availability_zones.available.names[0]]
  public_subnets  = ["10.0.101.0/24"]
  private_subnets = ["10.0.101.0/24"]

  enable_nat_gateway      = false
  enable_vpn_gateway      = false
  map_public_ip_on_launch = true

}