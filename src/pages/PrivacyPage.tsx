import { ArrowLeft } from 'lucide-react'

const TELEGRAM = 'https://t.me/AlexSTETSKIY'
const EMAIL = 'clubberok13@gmail.com'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const SECTIONS = [
  {
    title: '1. Общие положения',
    text: `Настоящая Политика конфиденциальности описывает, как LIDINC («мы», «нас», «наш») собирает, использует и защищает информацию, которую вы предоставляете при использовании сайта lidinc.ru. Используя сайт, вы соглашаетесь с условиями данной политики.`,
  },
  {
    title: '2. Какие данные мы собираем',
    text: `Мы можем собирать следующую информацию:\n• Имя и контактные данные (телефон, email) — при отправке заявки через форму обратной связи.\n• Данные переписки — при общении с AI-ассистентом или через Telegram.\n• Технические данные — IP-адрес, тип браузера, страницы посещения (для аналитики).`,
  },
  {
    title: '3. Как мы используем данные',
    text: `Собранные данные используются для:\n• Обработки и ответа на ваши заявки.\n• Улучшения качества услуг и сайта.\n• Отправки информации об услугах, если вы дали на это согласие.\n• Статистического анализа использования сайта.`,
  },
  {
    title: '4. Передача данных третьим лицам',
    text: `Мы не продаём и не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ. Данные могут передаваться сервисам аналитики (Яндекс.Метрика, Google Analytics) в обезличенном виде.`,
  },
  {
    title: '5. Хранение данных',
    text: `Персональные данные хранятся на защищённых серверах. Мы принимаем разумные технические и организационные меры для защиты информации от несанкционированного доступа, изменения, раскрытия или уничтожения.`,
  },
  {
    title: '6. Права пользователя',
    text: `Вы вправе:\n• Запросить доступ к своим персональным данным.\n• Потребовать исправления или удаления данных.\n• Отозвать согласие на обработку данных в любое время.\n\nДля реализации прав обратитесь к нам по контактам ниже.`,
  },
  {
    title: '7. Использование файлов cookie',
    text: `Сайт может использовать файлы cookie для улучшения работы и сбора аналитических данных. Вы можете отключить cookie в настройках браузера, однако это может повлиять на функциональность сайта.`,
  },
  {
    title: '8. Контактная информация',
    text: `По вопросам, связанным с обработкой персональных данных, обращайтесь:\n• Telegram: t.me/AlexSTETSKIY\n• Email: clubberok13@gmail.com`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center px-6 sm:px-12 md:px-20 pt-5 pb-4 backdrop-blur-md bg-black/30 border-b border-white/[0.06]">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[13px]"
        >
          <ArrowLeft size={15} />
          Вернуться на главную
        </button>
        <div className="ml-auto flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 256 256" fill="none">
            <path fill="url(#lidinc-grad)" d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z" />
          </svg>
          <span className="text-white/50 text-[12px] font-medium tracking-[0.1em]">LIDINC</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <p className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium">Документ</p>
        <h1 className="text-[2rem] sm:text-[2.8rem] leading-tight text-white mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          Политика конфиденциальности
        </h1>
        <p className="text-white/30 text-[13px] mb-12">Последнее обновление: июнь 2026</p>

        <div className="space-y-10">
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 className="text-white text-[15px] font-semibold mb-3">{s.title}</h2>
              <p className="text-white/55 text-[14px] leading-relaxed whitespace-pre-line">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-white/25 text-[12px]">© 2026 LIDINC. Все права защищены.</p>
          <div className="flex gap-5">
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
              className="text-white/35 hover:text-white/60 text-[12px] transition-colors">Telegram</a>
            <a href={`mailto:${EMAIL}`}
              className="text-white/35 hover:text-white/60 text-[12px] transition-colors">{EMAIL}</a>
          </div>
        </div>
      </div>
    </div>
  )
}
