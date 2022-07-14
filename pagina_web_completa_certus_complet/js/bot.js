window.onload = async () => {
  const submitForm = () => {
    const chatInput = $(".chat-input").val();
 
    $("main").append(`
      <div class="chat-msg-box clint">
        <p>${chatInput}</p>
      </div>
      `);

    $.ajax({
      url: `https://javascript-chatbot.vercel.app/api/question/?q=${encodeURIComponent(chatInput)}`,
      method: "GET",
      cache: false,
      beforeSend: () => {
        $(".chat-input").val("");
        $(".typing").show();
        $("main").append(`
            <div class="chat-msg-box bot">
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>
            `);
        if ($(".chat-msg-box").length >= 10) {
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $(".chat-msg-box.bot:last-child").offset().top,
            },
            { duration: 500 },
          );
        }
      },
      success: (data) => {
        const response = data.responseText.replace(/\n/gm, "</br>");
        $(".chat-msg-box.bot:last-child").html(`<p>${response}</p>`);
      },
      error: () => {
        $(".chat-msg-box.bot:last-child").remove();
      },
      complete: () => {
        $(".typing").hide();
      },
    });
  };

  setTimeout(() => {
    $.ajax({
      url: "https://javascript-chatbot.vercel.app/api/welcome",
      success: (data) => {
        $("main").append(
          `<div class="chat-msg-box bot"><p>${data.responseText}</p></div>`,
        );
      },
    });
  }, 3000);

  $.ajax({
    url: "https://javascript-chatbot.vercel.app/api/allquestions",
    success: (data) => {
      data.forEach((qus) => {
        $(".questions.container").append(`
            <div class="question">
              <p>${qus}</p>
            </div>
            `);
      });
    },
  });

  const toogleShowSuggestions = () => {
    if ($("main").css("display") === "none") {
      $(".all-questions").hide();
      $("header img").attr(
        "src",
        "https://javascript-chatbot.vercel.app/src/images/chat_icon.png",
      );
      $("main").show();
      $("footer").show();
    } else {
      $(".all-questions").show();
      $("header img").attr(
        "src",
        "https://javascript-chatbot.vercel.app/src/images/close.png",
      );
      $("main").hide();
      $("footer").hide();
    }
  };

  $("#toogle-chat").on("click", () => {
    toogleShowSuggestions();
  });

  window.onresize = () => {
    if (window.innerHeight < 580) {
      $("header").css("top", "-4em");
    } else {
      $("header").css("top", "0vh");
    }
  };

  $("#chat-form").submit((e) => {
    e.preventDefault();
    submitForm();
  });

  const typed = new Typed(".chat-input", {
    strings: [
      "¿Algun error en las compras? Esperamos solucionar tus problemas",
      "Puedes comunicarte con 987654321 si deseas una mejor atencion",
      "certus@gmail.certus.com para mejor comunicacion",
      "Estamos en Jr. Los Amautas 180, San Juan de Lurigancho 15401",
      "Explica el problema aqui",
      "el bot puede tardar en responder  unos segundos",
      "EL bot te esta esperando...",
    ],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    showCursor: true,
    cursorChar: "|",
    attr: "placeholder",
    loop: true,
    bindInputFocusEvents: false,
    shuffle: true,
  });
};
