const menuItem = document.querySelectorAll('.menu_item');
console.log(menuItem);

for (let item of menuItem) {
  item.addEventListener('click', () => {
  event.target.style.backgroundColor = '#68de8a';
  console.log(item); 
  });
}
