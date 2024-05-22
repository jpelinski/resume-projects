resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  instance_tenancy = "default"
  tags = {
    Name = "VPC Task"
  }
}
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "VPC Task Internet Gateway"
  }
}
resource "aws_eip" "eip" {
  count = length(aws_subnet.public_subnets)
  domain = "vpc"
}