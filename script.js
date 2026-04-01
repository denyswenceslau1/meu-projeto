const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

const btnFetch = document.getElementById('btn-fetch');
const catImage = document.getElementById('cat-image');
const placeholder = document.getElementById('placeholder');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');

async function fetchCatImage() {
  // Mostra loading, esconde o resto
  placeholder.classList.add('hidden');
  catImage.classList.add('hidden');
  errorMsg.classList.add('hidden');
  loading.classList.remove('hidden');
  btnFetch.disabled = true;

  try {
    const response = await fetch(CAT_API_URL);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data[0].url;

    // Pré-carrega a imagem antes de exibir
    const img = new Image();
    img.onload = () => {
      catImage.src = imageUrl;
      catImage.classList.remove('hidden');
      loading.classList.add('hidden');
      btnFetch.disabled = false;
    };
    img.onerror = () => {
      throw new Error('Falha ao carregar imagem');
    };
    img.src = imageUrl;

  } catch (error) {
    console.error('Erro ao buscar gatinho:', error);
    loading.classList.add('hidden');
    placeholder.classList.remove('hidden');
    errorMsg.classList.remove('hidden');
    btnFetch.disabled = false;
  }
}

btnFetch.addEventListener('click', fetchCatImage);
