module.exports.index = function (req,res){
    return res.json(200,{
        message: 'Posts API',
        posts: [
            {
                imageName: "dog",
                imageSrc: "https://images.dog.ceo/breeds/eskimo/n02109961_2555.jpg"
            },
            {
                imageName: "naruto Character",
                imageSrc: "http://www.leafninja.com/images/information/Aburame2.jpg"
            }
        ]
    });
}