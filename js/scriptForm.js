// 1. Configurar a ligação com o projeto Supabase (Substitua com os dados do seu NOVO projeto)
const SUPABASE_URL = "https://snjgrkqvehrxiuuuxfjx.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_NNrtX3lpwbBgsuDleTvuAg_I9v6-ufR"; 

// Inicialização oficial do cliente para ambiente de desenvolvimento local
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false
  }
});

// Dicionário de mapeamento para as categorias ficarem amigáveis na tela
const categoriesMap = {
    'ui-ux': 'Design',
    'performance': 'Performance',
    'features': 'Funcionalidades',
    'bugs': 'Bugs'
};

// --- Funções de Ação Globais (Conectadas ao Banco) ---

// Função para EXCLUIR um feedback do banco e da tela
async function deleteComment(id) {
    if (confirm("Deseja realmente excluir este feedback permanente do banco?")) {
        try {
            const { error } = await supabaseClient
                .from('feedbacks')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Se deletou com sucesso no banco, remove da tela com animação
            const el = document.getElementById('feedback-' + id);
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'scale(0.95)';
                setTimeout(() => el.remove(), 300);
            }
        } catch (err) {
            console.error("Erro ao deletar:", err);
            alert("Não foi possível excluir o feedback: " + err.message);
        }
    }
}

// Função para EDITAR o texto de um comentário no banco e na tela
async function editComment(id) {
    const el = document.getElementById('feedback-' + id);
    const p = el.querySelector('.comment-text');
    const novoTexto = prompt("Edite sua sugestão:", p.innerText);
    
    if (novoTexto !== null && novoTexto.trim() !== "") {
        try {
            const { error } = await supabaseClient
                .from('feedbacks')
                .update({ comment: novoTexto.trim() })
                .eq('id', id);

            if (error) throw error;

            // Se salvou no banco, atualiza o texto na tela imediatamente
            p.innerText = novoTexto.trim();
        } catch (err) {
            console.error("Erro ao atualizar:", err);
            alert("Não foi possível salvar a alteração: " + err.message);
        }
    }
}

// --- Inicialização do App assim que o HTML carregar ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const muralList = document.getElementById('muralList');

    if (!form) {
        console.error("Erro: Formulário '#feedbackForm' não foi encontrado no HTML!");
        return;
    }

    // Escutar o evento de envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capturar os dados com segurança usando o FormData do formulário
        const formData = new FormData(form);
        const ratingSelected = formData.get('rating'); 
        const categorySelected = formData.get('category'); 
        const commentText = formData.get('message'); 

        if (!ratingSelected) {
            alert('Por favor, selecione uma nota! ⭐');
            return;
        }

        // Efeito visual de carregamento no botão de envio
        const btn = form.querySelector('.btn-submit') || form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.innerText : 'Enviar Feedback';
        
        if (btn) {
            btn.innerText = 'Enviando... 🚀';
            btn.disabled = true;
        }

        try {
            // Inserir os dados na tabela do Supabase
            const { error } = await supabaseClient
                .from('feedbacks')
                .insert([
                    { 
                        rating: parseInt(ratingSelected), 
                        category: categorySelected || 'ui-ux', 
                        comment: commentText || "Apenas avaliou."
                    }
                ]);

            if (error) throw error;

            alert('Feedback enviado com sucesso!');
            form.reset(); // Limpa os campos do formulário
            atualizarMural(); // Recarrega a lista trazendo o novo dado inserido

        } catch (err) {
            console.error("Erro capturado no envio:", err);
            alert("Erro ao conectar com o Supabase: " + (err.message || "Falha na rede"));
        } finally {
            // Restaura o estado original do botão independente de sucesso ou falha
            if (btn) {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        }
    });

    // Função interna para renderizar/gerar a estrutura HTML de cada item do banco
    function renderFeedbackItem(item) {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.id = 'feedback-' + item.id; // Define um id único para o elemento na tela

        const labelCategoria = categoriesMap[item.category] || item.category || 'Geral';

        div.innerHTML = `
            <span class="badge">Nota: ${item.rating}/5</span>
            <span class="badge" style="background:#e6daf2; color:#4c2875; margin-left:5px;">${labelCategoria}</span>
            <p class="comment-text" style="margin-top:10px; font-size:0.95rem; color:#475569;">${item.comment}</p>
            <div class="comment-actions">
                <button class="btn-action btn-edit" onclick="editComment('${item.id}')">Editar</button>
                <button class="btn-action btn-delete" onclick="deleteComment('${item.id}')">Excluir</button>
            </div>
        `;
        if (muralList) muralList.appendChild(div);
    }

    // Função para buscar dados do Supabase e renderizar na tela
    async function atualizarMural() {
        if (!muralList) return;

        try {
            const { data: feedbacks, error } = await supabaseClient
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false }); // Traz os feedbacks mais recentes primeiro

            if (error) throw error;

            // Limpa o mural para evitar duplicação de itens
            muralList.innerHTML = '';
            
            // Renderiza cada um dos feedbacks vindos do banco
            feedbacks.forEach(item => {
                renderFeedbackItem(item);
            });
        } catch (err) {
            console.error("Erro ao carregar o mural:", err);
        }
    }

    // Executa a busca automática e popula a lista assim que abre a página
    atualizarMural();
});