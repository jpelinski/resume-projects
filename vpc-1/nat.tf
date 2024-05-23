resource "aws_nat_gateway" "natgw" {
    count = length(aws_subnet.public_subnets)
    subnet_id = element(aws_subnet.public_subnets[*].id, count.index)
    allocation_id = element(aws_eip.eip[*].id, count.index)
    tags = {
        Name = "Nat gateway ${count.index}"
    }
}