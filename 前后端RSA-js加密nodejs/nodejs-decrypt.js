var express = require('express');
var router = express.Router();

var url = require("url");
var querystring=require('querystring');
var crypto = require('crypto');
var constants = require('constants');

router.get('/test4',function(req,res,next){
	var publickey = "-----BEGIN PUBLIC KEY-----"+"\r\n"+
	"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkIQsMucD7dduyY7gEIWHd6JUN"+"\r\n"+
	"El9Wtjvo3QhZr1ri6eeHAcpsYalfirZGDUkOArbChRMGNQZTNs8YptlPbj8sdkHb"+"\r\n"+
	"uZEoZDpjcYRUYvfJkmmOQdv5d2RorgKqd2LWZFvMFqcM+vOty2MN8IvieliHJo0Z"+"\r\n"+
	"54Cq1z5SEZCT85UtQwIDAQAB"+"\r\n"+
	"-----END PUBLIC KEY-----";
	
	var privatekey = "-----BEGIN PRIVATE KEY-----"+"\r\n"+
	"MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBAOQhCwy5wPt127Jj"+"\r\n"+
	"uAQhYd3olQ0SX1a2O+jdCFmvWuLp54cBymxhqV+KtkYNSQ4CtsKFEwY1BlM2zxim"+"\r\n"+
	"2U9uPyx2Qdu5kShkOmNxhFRi98mSaY5B2/l3ZGiuAqp3YtZkW8wWpwz6863LYw3w"+"\r\n"+
	"i+J6WIcmjRnngKrXPlIRkJPzlS1DAgMBAAECgYEA4pVjSTdyUxBjrtJWoluZvfPV"+"\r\n"+
	"n08hPJnx9T8cnR+LURfrq29+45k4xjmbAwcNCYpuhdPw6lheOOaWWbDW5Irm2Fzr"+"\r\n"+
	"x2mSUe5tc7O+lfMBQxn9ur2tqdb2DZlgQbbH9X/IbtiT0bp0ZPq9Elpw/km6kkGo"+"\r\n"+
	"2ELUCxOAwTVYqAEDc7kCQQD82uRMJPa9o25MSGMB0pqyfKIHJWzqiQ5A+Rinljbu"+"\r\n"+
	"aSwuvcPSqGHJ5yGoH40NUqaX9+etPFHMGWXqXRYtyFRlAkEA5vdsEesdyHYwT2uo"+"\r\n"+
	"QQNeQKh8ETZUJqKRmhasZcR3EEzLUAPErcUmb1X3glY0ZyfdYt1xU8k0CpEXoFQ8"+"\r\n"+
	"FXU8hwJBAPKuU7cRMw/Hr7DfOMcjDv6HyCr7rJFdgaSybwtJjOc9Yf5qe2vP2Csj"+"\r\n"+
	"/pWR0psa3HG2qVEHN6qgJcTOGt9OClECQQDPDgBUD/MjQtEMYfb0UZCtZl3TEGFg"+"\r\n"+
	"QV1GRg1HLlmOw0mA8d/f6F4McYTx01YnJBXUC7EM69M7pdcIZHt4wSEBAkEAn7oK"+"\r\n"+
	"fwalCVOMwbspA7VmkTEaebI4o5Lp+rnXqQIbxVYACBamD1nkp+3R9tqM3+5Ta5U1"+"\r\n"+
	"fTqNAyygu3E8IS7JWA=="+"\r\n"+
	"-----END PRIVATE KEY-----";
	
	var start=req.url.indexOf('msg=');
	console.log(start);
	var arg=req.url.substring(11);
	console.log(arg);
	var msg = arg;
	// res.send(encrypt);
	console.log(msg);
	msg = new Buffer(msg, "base64");
	try{
	var pkey = new Object();
	pkey.key=privatekey;
	//注意padding参数的设定
	pkey.padding=constants.RSA_PKCS1_PADDING;
	var decrypt=crypto.privateDecrypt(pkey,msg);
	res.send(decrypt);
	}catch(e){
		console.log(e.message);
		res.send(e.message);
	}
});

router.get('/test5',function(req,res,next){
	var start=req.url.indexOf('msg=');
	console.log(start);
	var arg=req.url.substring(11);
	console.log(arg);
	var msg = arg;
	// res.send(encrypt);
	console.log(msg);
	msg = new Buffer(msg, "base64");

	var privatePem = fs.readFileSync(__dirname+'/privatekey.pem');
	var privatekey = privatePem.toString('utf8');
	try{
	var pkey = new Object();
	pkey.key=privatekey;
	pkey.padding=constants.RSA_PKCS1_PADDING;
	var decrypt=crypto.privateDecrypt(pkey,msg);
	res.send(decrypt);
	}catch(e){
		console.log(e.message);
		res.send(e.message);
	}
});
module.exports = router;
