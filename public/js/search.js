const searchForm = document.querySelector('#search-form');

async function handleSubmit(event) {
  event.preventDefault();

  const searchTerm = document.querySelector('#search').value.trim();

  window.location.href = `/search/${searchTerm}`;
}

searchForm.addEventListener('submit', handleSubmit);
