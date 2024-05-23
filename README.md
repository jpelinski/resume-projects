## This is repository of different mini-projects created for public view.

### VPC-1

##### Build AWS VPC using Terraform and deploy EC2 instances in private subnets.

- Created 3 EC2 instances, each in one Avability Zone

- All instances are connected to their own NAT gateway in every AZ.

- ElasticIP's are assigned to NAT gateways

- Number of created instances can be increased based on region AZ's.

- AMI instance is automaticly chosen based on created filter.
