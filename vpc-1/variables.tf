variable "public_subnet_cidrs" {
  type = list(string)
  description = "Public subnet CIDR values"
  default = [ "10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24" ]
}
variable "private_subnet_cidrs" {
  type = list(string)
  description = "Private subnet CIDR values"
  default = [ "10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24" ]
}
variable "azs" {
  type = list(string)
  description = "List of Availability Zones"
  default = [ "eu-central-1a", "eu-central-1b", "eu-central-1c" ]
}
variable "my_ip" {
  type = string
  description = "My IP number"
  default = "1.1.1.1/32"
}