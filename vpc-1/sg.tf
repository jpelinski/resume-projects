resource "aws_security_group" "private_sg" {
  vpc_id = aws_vpc.main.id

 # HTTP HTTPS SSH accesss
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = [ var.my_ip ]
  }
    ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = [ var.my_ip ]
  }
    ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [ var.my_ip]
  }
  # Internet access everywhere
    egress {
    from_port = 0
    to_port = 0
    protocol = -1
    cidr_blocks = [ "0.0.0.0/0" ]
  }
}