data "aws_availability_zones" "available" {
  state = "available"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.19.0"

  name = "${var.project_name}-vpc"
  cidr = "10.0.0.0/16"

  azs             = [data.aws_availability_zones.available.names[0], data.aws_availability_zones.available.names[1]]
  public_subnets  = ["10.0.102.0/24", "10.0.103.0/24"]
  private_subnets = ["10.0.100.0/24", "10.0.101.0/24"]

  create_database_subnet_group           = true
  create_database_subnet_route_table     = true
  create_database_internet_gateway_route = true

  database_subnet_group_name = "${var.project_name}-db-sub-group"
  database_subnets           = ["10.0.104.0/24", "10.0.105.0/24"]

  enable_dns_hostnames = true
  enable_dns_support   = true

  enable_nat_gateway      = false
  enable_vpn_gateway      = false
  map_public_ip_on_launch = true
}
