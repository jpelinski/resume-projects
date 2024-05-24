## This is repository of different mini-projects created for public view.

---

### VPC-1

![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

---

##### Build AWS VPC using Terraform and deploy EC2 instances in private subnets.

- Created 3 EC2 instances, each in one Avability Zone

- All instances are connected to their own NAT gateway in every AZ.

- ElasticIP's are assigned to NAT gateways

- Number of created instances can be increased based on region AZ's.

- AMI instance is automaticly chosen based on created filter.

---

## Serve Data From Cache

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NODE.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

---

This application is an implementation of fetching data from google book API, saving data to cache files and reading cahced data if specific conditions are met.

Before start please run: `npm install` to install "fs" and "axios".

To start, run: `node App.js`.

Then type keyword you are looking for. For example "terraform", after that you will recive list of books from API with this keyword.

### Explanation

> After writing your keyword, app will check if cache file already exists.
>
> > (TRUE) If it exists, it will check if was created more than 10 seconds ago.
> >
> > > (TRUE) More than 10 seconds: it will make API call.
> > > (FALSE) Less than 10 seconds: it will serve data from cache file
> > > (FALSE) If file does not exists, it will make API call, and save JSON data to cache file.
