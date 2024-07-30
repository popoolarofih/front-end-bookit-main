gsap.from(".logo-img", 1, {
    scale: 0,
    ease: 'ease.out'
})
gsap.from(".navbar ul li", 2, {
    y: -250,
    stagger: .15

})
gsap.from(".header-two h1", 1, {
    y: 250,
    skewY: 20,
    stagger:  .7
})
gsap.from(".apartment-section p", 1, {
    y: 250,
    skewY: 20,
    stagger:  .7
})


ScrollTrigger.create({
    trigger: ".features",
    start: "top top",
    end: "bottom bottom,",
    pin: "right"
})



gsap.fromTo('.image', {
  scale: .2,
  opacity: 0,
  skewY: 30
},{
  scale: .1,
  opacity:1,
  skewY: 0,
  duration: 1,
  delay: .5,
  ScrollTrigger: '.image'
})
