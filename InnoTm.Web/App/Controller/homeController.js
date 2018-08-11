app.controller('homeController', function ($scope, $filter, userServices) {

    var homeImg = {
        diveshSir: "App/View/images/home/diveshSir.jpg",
        AnnaDeynah: "App/View/images/home/AnnaDeynah.jpg",
        Slider1: "App/View/images/home/carousel/Slider-01.jpg",
        Slider2: "App/View/images/home/carousel/Slider-02.jpg",
        Slider3: "App/View/images/home/carousel/Slider-03.jpg",
        Slider4: "App/View/images/home/carousel/Slider-04.jpg",
        Slider5: "App/View/images/home/carousel/Slider-05.jpg"
    }

    $scope.homeImg = homeImg;
});