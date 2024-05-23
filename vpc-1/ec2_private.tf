resource "aws_instance" "my-private-instance" {
    count = length(var.azs)
    ami = data.aws_ami.alinux.id
    instance_type = "t2.micro"
    vpc_security_group_ids = [aws_security_group.private_sg.id]
    tags = {
        Name = "private-instance-${count.index}"
    }
    subnet_id = element(aws_subnet.private_subnets[*].id, count.index)
}