resource "aws_route_table" "rt_private" {
    count = length(aws_nat_gateway.natgw)
    vpc_id = aws_vpc.main.id
    route {
        cidr_block = "0.0.0.0/0"
        nat_gateway_id = element(aws_nat_gateway.natgw[*].id, count.index)
    }
    tags = {
        Name = "Route table for private subnet ${count.index + 1}"
    }
}
resource "aws_route_table_association" "rt_private_association" {
    count = length(aws_subnet.private_subnets)
    subnet_id = element(aws_subnet.private_subnets[*].id, count.index)
    route_table_id = element(aws_route_table.rt_private[*].id, count.index)
}