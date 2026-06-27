<script>
function toggleMenu() {
  document.getElementById("nav").classList.toggle("show");
  document.querySelector(".overlay").classList.toggle("show");
}

// ★リンク押したら閉じる
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("show");
    document.querySelector(".overlay").classList.remove("show");
  });
});
</script>
