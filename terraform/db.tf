locals {
  db_identifier = "${var.project_name}-db"
}
resource "aws_security_group" "public_access_db_sg" {
  name        = "${var.project_name}-db"
  description = "Database for Model Project"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "Allow inbound traffic from the internet"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}


resource "aws_db_instance" "database" {
  allocated_storage         = 20
  identifier                = local.db_identifier
  db_name                   = "modelProjectDB"
  engine                    = "postgres"
  engine_version            = "15.2"
  instance_class            = "db.t3.micro"
  username                  = var.db_username
  password                  = var.db_password
  publicly_accessible       = true
  apply_immediately         = true
  final_snapshot_identifier = "${local.db_identifier}-final-snapshot"
  db_subnet_group_name      = module.vpc.database_subnet_group_name
  vpc_security_group_ids    = [aws_security_group.public_access_db_sg.id]
}