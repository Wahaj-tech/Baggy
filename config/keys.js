//we need jwt key many time so--->
//but question arises if we write jwt:"key value" then koi bhi pdh skta h issilie hm iss trh nhi likhte hm environment variable joh hmare memory m save hota h woh likhte h ($env:JWT_KEY="write your key value")
{
    JWT_KEY:process.env.JWT_KEY;
}