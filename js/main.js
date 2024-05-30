new TypeIt("#companionMethods", {
  speed: 50,
  waitUntilVisible: true,
})
  .type("Walcome", { delay: 300 })
  .move(-4)
  .delete(1)
  .type("e")
  .move(null, { to: "END" })
  .type(" to MyPage")
  .pause(300)
  .delete(4)
  .type("page")
  .go();
