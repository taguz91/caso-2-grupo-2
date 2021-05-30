S3 - Public confiuguration testing purpo

Files upload: 
```
{
    "Version": "2012-10-17",
    "Id": "PutOnlyPolicy",
    "Statement": [
        {
            "Sid": "Allow_PublicPut",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::tir-anexos/*"
        },
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::tir-anexos/*"
        }
    ]
}
```

Static websites: 
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPermission",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::tir-app/*"
        }
    ]
}
```

Ec2 ports 

- 80
- 8080
- 5432
- 22