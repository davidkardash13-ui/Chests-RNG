(function () {
  "use strict";

  const RARITY_MAX = 17;

  const RARITIES = [
    { id: 0, name: "Обычный", short: "Обычн." },
    { id: 1, name: "Необычный", short: "Необычн." },
    { id: 2, name: "Редкий", short: "Редкий" },
    { id: 3, name: "Эпический", short: "Эпич." },
    { id: 4, name: "Легендарный", short: "Легенд." },
    { id: 5, name: "Мифический", short: "Мифич." },
    { id: 6, name: "Божественный", short: "Божеств." },
    { id: 7, name: "Вечный", short: "Вечный" },
    { id: 8, name: "Астральный", short: "Астрал." },
    { id: 9, name: "Космический", short: "Космич." },
    { id: 10, name: "Первозданный", short: "Первозд." },
    { id: 11, name: "Абсолютный", short: "Абсол." },
    { id: 12, name: "Призрачный", short: "Призрач." },
    { id: 13, name: "Эфирный", short: "Эфирн." },
    { id: 14, name: "Планарный", short: "Планар." },
    { id: 15, name: "Сверхновый", short: "Сверхн." },
    { id: 16, name: "Мультивселенский", short: "Мультив." },
    { id: 17, name: "Омега", short: "Омега" },
  ];

  const CHEST_ICONS = ["📦", "🎁", "🧰", "💠", "✨", "🌟", "🗝️", "🔱", "🌌", "☄️", "💎", "👑", "🫧", "🔆", "🕳️", "🌠", "🛸", "♾️"];
  const EGG_ICONS = ["🥚", "🥚", "🪺", "🪺", "🐣", "🫧", "✨", "🔮", "🌟", "💫", "🦄", "🐉", "👻", "🌫️", "🪐", "☄️", "🌌", "🦋"];

  const ITEM_ICONS = ["🔹", "🔸", "💠", "💎", "🔮", "⚔️", "🛡️", "🌀", "✳️", "🌠", "🧿", "⚜️", "👻", "🜁", "🜂", "🜃", "🜄", "♾️"];
  const PET_FACE_ICONS = ["🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🦁", "🐸", "🐲", "🦋", "🦅", "🐙", "👻", "🦄", "🐉", "🦑", "🐋", "🌟"];

  const ITEM_POOLS = [
    ["Камень", "Ветка", "Грязь", "Слиток меди", "Кость", "Песок", "Уголь", "Щепка", "Мох", "Ржавый гвоздь", "Крошка руды", "Обломок кирки"],
    ["Кварц", "Железная руда", "Травы", "Кожа", "Янтарь", "Берёзовый сок", "Гриб", "Паутина", "Смола", "Кремень", "Перо ворона", "Медный провод"],
    ["Сапфир", "Мифрил", "Эссенция огня", "Кристалл", "Руна силы", "Лунный камень", "Яд змеи", "Кость тролля", "Шкура волка", "Серебряная пыль", "Обсидиан", "Тлеющий уголь"],
    ["Теневая сфера", "Драконья чешуя", "Философский камень", "Осколок короны", "Кровь элемента", "Печать мага", "Клык вампира", "Сердце голема", "Пыль звёзд", "Лезвие призрака", "Слеза феи", "Корень мандрагоры"],
    ["Клинок эпохи", "Перо феникса", "Сердце титана", "Кольцо власти", "Копьё грома", "Щит рассвета", "Мантия теней", "Рог единорога", "Книга заклинаний", "Сфера времени", "Браслет вечности", "Крыло демона"],
    ["Осколок реальности", "Капля вечности", "Звезда смерти", "Душа мира", "Семя хаоса", "Прах богов", "Нить судьбы", "Замок от времени", "Ключ к бездне", "Слеза богини", "Пламя судьбы", "Сердце вселенной"],
    ["Реликвия солнца", "Прах ангела", "Свиток творения", "Капля нектара богов", "Осколок рая", "Печать небес", "Кольцо пророка", "Кристалл истины", "Перо серафима", "Сосуд света", "Труба апокалипсиса", "Венец святого"],
    ["Песок вечности", "Часы миров", "Корона забвения", "Зеркало душ", "Камень судьбы", "Цепь веков", "Семя мирового древа", "Прах звёзд", "Кольцо Уробороса", "Сфера забвения", "Лезвие эона", "Кристалл забвения"],
    ["Астральная нить", "Осколок сна", "Пыль туманностей", "Коготь пустоты", "Сердце туманности", "Кристалл галактик", "Перо космоса", "Семя тьмы", "Око тумана", "Камень орбиты", "Спираль времени", "Песок квазара"],
    ["Пульсар в бутылке", "Кварк странности", "Тёмная материя", "Сингулярность", "Нить планки", "Кристалл горизонта", "Пыль большого взрыва", "Осколок чёрной дыры", "Нейтрино удачи", "Гравитационная линза", "Спектр квазара", "Плазма туманности"],
    ["Зародыш вселенной", "Точка альфа", "Первый свет", "Имя творца", "Дыхание пустоты", "Семя законов", "Камень до времени", "Нить до Большого взрыва", "Искра бытия", "Тень первого дня", "Корень реальности", "Зерно бесконечности"],
    ["Абсолют", "Всё и ничто", "Точка омега", "Источник RNG", "Парадокс", "Единая истина", "Конец списка", "Начало конца", "Суть удачи", "Корона RNG", "Сундук сундуков", "Лопата лопат"],
    ["Эхо пустоты", "Пыль забвения", "Осколок сна", "Нить миража", "Камень отражений", "Слеза призрака", "Перо тумана", "Семя иллюзии", "Корень миража", "Зеркало теней", "Печать забвения", "Сосуд эха"],
    ["Сущность эфира", "Капля звука", "Кристалл вибрации", "Нить резонанса", "Пыль радуги", "Осколок света", "Сердце эха", "Кольцо гармонии", "Сфера тонов", "Лезвие частот", "Семя волны", "Ключ эфира"],
    ["Пласт реальности", "Узел миров", "Камень плана", "Дверь измерений", "Печать плоскости", "Корень параллели", "Око границы", "Нить перехода", "Слеза портала", "Кристалл слоёв", "Кольцо планов", "Якорь миров"],
    ["Сердце сверхновой", "Пепел звезды", "Искра сингулярности", "Плазма зари", "Осколок фотосферы", "Нить фьюжна", "Капля гравитации", "Перо вспышки", "Семя коллапса", "Кристалл нейтрино", "Тень взрыва", "Сосуд зари"],
    ["Король ветвей", "Пыль вселенных", "Осколок альтернатив", "Нить вероятности", "Камень выбора", "Сердце парадокса", "Печать бесконечности", "Кольцо циклов", "Сфера дублей", "Ключ разлома", "Слеза дуальности", "Трон разночтений"],
    ["Точка омега", "Имя конца", "Суть предела", "Корона финала", "Семя тишины", "Око вечности", "Нить смысла", "Камень предела", "Прах вечности", "Сосуд омеги", "Замок финала", "RNG-ядро"],
  ];

  const PET_POOLS = [
    ["Мышонок Шустрик", "Хомяк Пух", "Крот Землерой", "Жук Светлячок", "Улитка Тише", "Паучок Угол", "Жабка Прыг", "Цыплёнок Пиу", "Утёнок Кряк", "Рыбка Пузырь", "Котёнок Мур", "Щенок Гав"],
    ["Лисичка Хитрая", "Енот Ночник", "Барсук Коп", "Сова Мудрая", "Заяц Ушаст", "Кабан Клык", "Волчонок Серый", "Медвежонок Соня", "Еж Колюч", "Белка Орех", "Собака Друг", "Кот Тень"],
    ["Волк Лунный", "Медведь Горный", "Сокол Ветер", "Змей Мудрый", "Лось Рогач", "Рысь Тихая", "Орёл Коготь", "Ворон Пророк", "Змей Огненный", "Лис Арктик", "Тигр Полоса", "Пантера Ночь"],
    ["Пёс Инферно", "Кот Астрал", "Сова Тьмы", "Змей Кристалл", "Ворон Небес", "Медведь Рун", "Волк Шторм", "Лис Звёзд", "Орёл Гром", "Змей Янтарь", "Тигр Дух", "Фенек Пустыни"],
    ["Феникс Искра", "Грифон Небес", "Единорог Свет", "Дракончик Огонь", "Кентавр Стрела", "Мантикора Шип", "Гидра Младшая", "Базилиск Взгляд", "Кракен Малыш", "Нага Жемчуг", "Сфинкс Загадка", "Пегас Облако"],
    ["Дракон Рубин", "Феникс Пламя", "Кракен Глубь", "Лев Золотой", "Василиск Король", "Гидра Болото", "Чимера Три", "Ифрит Уголь", "Дух Тайфун", "Ангел Падший малыш", "Демон Искра", "Архонт Пепел"],
    ["Серафим Перо", "Архангел Щит", "Пегас Заря", "Дракон Звёзд", "Феникс Вечный", "Кирилл Света", "Трон Малый", "Валькирия Юная", "Витязь Туман", "Пророк Сон", "Святой Кот", "Богомол Молитва"],
    ["Элементаль Век", "Дух Времени", "Страж Песков", "Хранитель Часов", "Тень Века", "Сфинкс Вечный", "Дракон Эпох", "Феникс Циклов", "Древо Миров", "Червь Времени", "Судья Эонов", "Птица Судьбы"],
    ["Призрак Тумана", "Спектр Снов", "Сущность Звёзд", "Страж Астрала", "Путник Снов", "Кот Шрёдингера", "Фантом Пульсара", "Дух Квазара", "Тень Небесной оси", "Звезда Удачи", "Комета Хвост", "Метеор Желание"],
    ["Космический Кит", "Нейтрино Друг", "Кварк Игривый", "Гравитон Тяга", "Планетоид Дух", "Спутник Верный", "Протозвезда Малыш", "Туманность Пух", "Чёрная дыра Дом", "Пульсар Тик", "Галактика Мини", "Сингулярность Кот"],
    ["Первозданный Зверь", "Зародыш Мира", "Свет До Дня", "Тень До Тени", "Имя Без Имени", "Точка Ноль", "Кот Бытия", "Пёс Вечности", "Птица Альфа", "Змей Омега", "Дракон Исток", "Феникс Начало"],
    ["Абсолютный Кот", "RNG-Дух", "Питомец Разработчика", "Сундук на Лапах", "Лопата Живая", "Удача В Плюше", "Мифический Пёс", "Легенда Лап", "Конец Игры", "Новая Игра+", "Тысячеликий Мур", "Бесконечный Хвост"],
    ["Призрак Лап", "Мираж Мур", "Тень Шёпот", "Дух Тумана", "Кот Полупрозрач", "Пёс Эха", "Сова Снов", "Заяц Иллюзий", "Рыбка Отражение", "Улитка Мгновение", "Жук Светлячок-2", "Хомяк Пустоты"],
    ["Эфирный Фенек", "Вибрация Кот", "Резонанс Пёс", "Гармония Сова", "Тональность Лиса", "Частота Медведь", "Волна Заяц", "Спектр Ворон", "Амплитуда Рысь", "Фаза Тигр", "Импульс Орёл", "Нота Дракон"],
    ["Планарный Зверь", "Страж Слоя", "Путник Миров", "Кот Границы", "Пёс Портала", "Сфинкс Плоскости", "Гидра Узлов", "Дракон Параллель", "Единорог Слияние", "Феникс Переход", "Кракен Разлом", "Пегас Мост"],
    ["Сверхновый Щенок", "Пульсар Кот", "Плазма Лиса", "Нейтрино Пёс", "Фотосфера Сова", "Коллапс Медведь", "Заря Волк", "Вспышка Тигр", "Сингулярность Кот-2", "Пепел Феникс", "Искра Дракон", "Тень Взрыва"],
    ["Мультикот", "Вселенский Пёс", "Парадокс Лис", "Ветвь Заяц", "Вероятность Ворон", "Дуальность Медведь", "Цикл Орёл", "Разлом Змей", "Бесконечный Хомяк", "Альтернатива Утка", "Квант Кролик", "RNG-Хомяк"],
    ["Омега-Кот", "Финальный Пёс", "Предел Лис", "Тишина Сова", "Вечность Медведь", "Смысл Дракон", "Конец Игры-2", "RNG Овца", "Омега Рыба", "Альфа Птица", "Точка Ноль Кот", "Последний Мур"],
  ];

  const SHOVELS = [
    { id: "s0", name: "Ржавая лопата", price: 0, luck: 0, desc: "Стартовый инструмент." },
    { id: "s1", name: "Деревянная лопата", price: 70, luck: 3, desc: "Лёгкая, но хрупкая." },
    { id: "s2", name: "Каменная лопата", price: 180, luck: 6, desc: "Тяжелее — стабильнее удар." },
    { id: "s3", name: "Медная лопата", price: 380, luck: 9, desc: "Проводит удачу." },
    { id: "s4", name: "Железная лопата", price: 720, luck: 12, desc: "Классика шахтёра." },
    { id: "s5", name: "Стальная лопата", price: 1400, luck: 15, desc: "Не гнётся." },
    { id: "s6", name: "Закалённая сталь", price: 2600, luck: 18, desc: "Для твёрдых пород." },
    { id: "s7", name: "Серебряная лопата", price: 4800, luck: 22, desc: "Блестит в темноте." },
    { id: "s8", name: "Электрумовая лопата", price: 8200, luck: 26, desc: "Сплав золота и серебра." },
    { id: "s9", name: "Золотая лопата", price: 14000, luck: 30, desc: "Символ богатства." },
    { id: "s10", name: "Лопата рудокопа", price: 24000, luck: 34, desc: "Проверена стажёрами." },
    { id: "s11", name: "Руническая лопата", price: 40000, luck: 38, desc: "Руны на черенке." },
    { id: "s12", name: "Обсидиановая лопата", price: 68000, luck: 42, desc: "Режет реальность." },
    { id: "s13", name: "Лопата алхимика", price: 115000, luck: 46, desc: "Переводит грязь в шанс." },
    { id: "s14", name: "Кристальная лопата", price: 195000, luck: 50, desc: "Резонанс с кристаллами." },
    { id: "s15", name: "Лопата дракона", price: 330000, luck: 54, desc: "Жар в руках." },
    { id: "s16", name: "Лопата феникса", price: 550000, luck: 58, desc: "Восстанавливается сама." },
    { id: "s17", name: "Теневая лопата", price: 920000, luck: 62, desc: "Копает сквозь тьму." },
    { id: "s18", name: "Астральная лопата", price: 1550000, luck: 66, desc: "Зацепляет другое измерение." },
    { id: "s19", name: "Лопата звёздной кузницы", price: 2600000, luck: 70, desc: "Слита из метеорита." },
    { id: "s20", name: "Небесная лопата", price: 4400000, luck: 74, desc: "Светится при удаче." },
    { id: "s21", name: "Лопата титана", price: 7500000, luck: 78, desc: "Вес как у горы." },
    { id: "s22", name: "Космическая лопата", price: 12500000, luck: 82, desc: "Гравитация на стороне шахтёра." },
    { id: "s23", name: "Лопата пульсара", price: 21000000, luck: 86, desc: "Тикает в такт RNG." },
    { id: "s24", name: "Лопата Большого взрыва", price: 35000000, luck: 90, desc: "Порождает лут из пустоты." },
    { id: "s25", name: "Первозданная лопата", price: 60000000, luck: 95, desc: "Была до первой кирки." },
    { id: "s26", name: "Лопата вечности", price: 100000000, luck: 100, desc: "Копает сквозь века." },
    { id: "s27", name: "Абсолютная лопата", price: 175000000, luck: 108, desc: "Вершина эволюции инструмента." },
    { id: "s28", name: "Лопата призрака", price: 300000000, luck: 112, desc: "Проходит сквозь породу." },
    { id: "s29", name: "Эфирная лопата", price: 520000000, luck: 116, desc: "Резонирует с рудой." },
    { id: "s30", name: "Планарная лопата", price: 900000000, luck: 120, desc: "Копает сразу в нескольких слоях." },
    { id: "s31", name: "Лопата сверхновой", price: 1550000000, luck: 124, desc: "Вспышка удачи." },
    { id: "s32", name: "Мультивселенская лопата", price: 2700000000, luck: 128, desc: "Все варианты удачи сразу." },
    { id: "s33", name: "Лопата сингулярности", price: 4700000000, luck: 132, desc: "Сжимает шанс в точку." },
    { id: "s34", name: "Лопата горизонта", price: 8200000000, luck: 136, desc: "За гранью обычных находок." },
    { id: "s35", name: "Лопата квазара", price: 14200000000, luck: 140, desc: "Светится миллиардами RNG." },
    { id: "s36", name: "Лопата тёмной энергии", price: 24800000000, luck: 145, desc: "Ускоряет расширение удачи." },
    { id: "s37", name: "Лопата струн", price: 43200000000, luck: 150, desc: "Вибрирует в такт вселенной." },
    { id: "s38", name: "Лопата омега-слоя", price: 75000000000, luck: 155, desc: "Почти последнее слово." },
    { id: "s39", name: "Лопата последнего рудника", price: 130000000000, luck: 162, desc: "То, что копают после RNG." },
  ];

  const SHOVEL_IDS = new Set(SHOVELS.map((s) => s.id));

  function normalizeOwnedShovels(raw) {
    const out = new Set();
    let list = [];
    if (Array.isArray(raw)) {
      list = raw;
    } else if (raw != null && typeof raw === "object") {
      list = Object.values(raw);
    }
    for (const x of list) {
      const id = String(x == null ? "" : x).trim();
      if (SHOVEL_IDS.has(id)) out.add(id);
    }
    if (!out.has("s0")) out.add("s0");
    return out;
  }

  function sanitizeGold(g) {
    const n = Number(g);
    if (!Number.isFinite(n) || n < 0) return 0;
    return n;
  }

  function canAfford(price) {
    return sanitizeGold(state.gold) >= price - 1e-6;
  }

  function snapshotUnownedAffordableSignature() {
    const next = nextShovelIndexToBuy();
    const parts = [];
    for (let i = 0; i < SHOVELS.length; i++) {
      if (i !== next) {
        parts.push("0");
        continue;
      }
      const sh = SHOVELS[i];
      parts.push(!state.ownedShovels.has(sh.id) && canAfford(sh.price) ? "1" : "0");
    }
    return parts.join("");
  }

  const SAVE_KEY = "chest-rng-save-v3";
  const SAVE_KEY_LEGACY = "chest-rng-save-v2";
  const FEVER_COMBO_TARGET = 3;
  const FEVER_DURATION_MS = 20000;
  const FEVER_FAST_CLEAR_MS = 6200;
  const WEATHER_MIN_MS = 120000;
  const WEATHER_MAX_MS = 210000;

  const WEATHER_EVENTS = [
    {
      id: "clear",
      name: "Ясно",
      icon: "☀️",
      chestShift: 0,
      chestMutChance: 0.08,
      itemMutChance: 0.08,
      itemPriceMul: 1.12,
      itemShift: 0,
      mutNames: ["Согретый солнцем", "Сияющий", "Золотистый"],
    },
    {
      id: "rain",
      name: "Дождь",
      icon: "🌧️",
      chestShift: 0,
      chestMutChance: 0.14,
      itemMutChance: 0.14,
      itemPriceMul: 1.15,
      itemShift: 0,
      mutNames: ["Промокший", "Речной", "Омытый дождём"],
    },
    {
      id: "storm",
      name: "Гроза",
      icon: "⛈️",
      chestShift: 1,
      chestMutChance: 0.16,
      itemMutChance: 0.16,
      itemPriceMul: 1.22,
      itemShift: 1,
      mutNames: ["Грозовой", "Заряженный", "Штормовой"],
    },
    {
      id: "blizzard",
      name: "Метель",
      icon: "🌨️",
      chestShift: 0,
      chestMutChance: 0.15,
      itemMutChance: 0.15,
      itemPriceMul: 1.2,
      itemShift: 0,
      mutNames: ["Обледенелый", "Морозный", "Снежный"],
    },
    {
      id: "eclipse",
      name: "Затмение",
      icon: "🌑",
      chestShift: 0,
      chestMutChance: 0.22,
      itemMutChance: 0.18,
      itemPriceMul: 1.28,
      itemShift: 0,
      mutNames: ["Теневой", "Лунный", "Поглощённый тьмой"],
    },
  ];

  const PET_GOLD_PER_SEC = [
    0.03, 0.07, 0.16, 0.38, 0.85, 1.9, 4.2, 9, 19, 40, 82, 165, 330, 520, 850, 1400, 2300, 3800,
  ];

  function clampR(r) {
    return Math.max(0, Math.min(RARITY_MAX, r | 0));
  }

  function pickWeighted(weights) {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) sum += weights[i];
    if (!(sum > 0) || !Number.isFinite(sum)) return 0;
    let roll = Math.random() * sum;
    for (let i = 0; i < weights.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return i;
    }
    return weights.length - 1;
  }

  function sellPrice(r) {
    const table = [
      5, 12, 28, 68, 165, 400, 980, 2400, 5900, 14500, 36000, 90000, 220000, 520000, 1200000, 2800000,
      6500000, 15000000,
    ];
    const i = clampR(r);
    return table[i] != null ? table[i] : table[table.length - 1];
  }

  function petReleasePrice(r) {
    return Math.max(1, Math.floor(sellPrice(r) * 0.35));
  }

  function petIncomePerSec(r) {
    return PET_GOLD_PER_SEC[clampR(r)];
  }

  function totalPassiveGoldPerSec() {
    let s = 0;
    for (const p of state.pets) s += petIncomePerSec(p.r);
    return s;
  }

  function formatIncomeRate(x) {
    if (x < 10) return x.toFixed(2);
    if (x < 100) return x.toFixed(1);
    return String(Math.round(x));
  }

  function rollChestRarity(luck) {
    const L = Math.min(130, Math.max(0, luck));
    const weights = [];
    for (let i = 0; i <= RARITY_MAX; i++) {
      const t = i / RARITY_MAX;
      const intrinsic = Math.exp(-i * 0.52);
      const luckSlide = Math.exp((L / 95) * t * 3.1);
      const antiCommon = i === 0 ? 1 / (1 + L * 0.022) : 1;
      weights.push(intrinsic * luckSlide * antiCommon);
    }
    return pickWeighted(weights);
  }

  function rollLootRarityFromSource(sourceR) {
    const s = clampR(sourceR);
    const luck = currentLuck();
    const sigma = 1.15 + (1 - s / RARITY_MAX) * 0.55;
    const weights = [];
    for (let i = 0; i <= RARITY_MAX; i++) {
      const d = i - s;
      let w = Math.exp(-(d * d) / (2 * sigma * sigma));
      if (i < s) {
        w *= 0.82 + Math.min(0.12, s * 0.012);
      }
      if (i > s) {
        const upgradePenalty = 0.18 + Math.min(0.52, luck * 0.0034 + s * 0.038);
        w *= upgradePenalty;
      }
      weights.push(w);
    }
    let r = pickWeighted(weights);
    if (Math.random() < 0.06 + s * 0.012) r = clampR(r + 1);
    if (Math.random() < 0.085) r = clampR(r - 1);
    return clampR(r);
  }

  function randomFromPool(pool, r) {
    const p = pool[clampR(r)];
    return p[Math.floor(Math.random() * p.length)];
  }

  function uid(prefix) {
    return (prefix || "x") + "_" + Date.now().toString(36) + "_" + Math.floor(Math.random() * 1e9).toString(36);
  }

  const PROMO_DEFINITIONS = {
    RUDNIK2026: { gold: 15000, msg: "Промокод: +15 000 золота." },
    CHESTGOLD: { gold: 50000, msg: "Промокод: +50 000 золота." },
    LOPATA: { gold: 25000, msg: "Промокод: +25 000 золота." },
    MEDNAYA: { gold: 500, shovelId: "s3", msg: "Промокод: медная лопата в коллекцию и +500 золота." },
    ZOLOTO777: { gold: 7777, msg: "Промокод: +7777 золота." },
    PETLOVE: { gold: 12000, msg: "Промокод: +12 000 золота." },
  };

  const state = {
    gold: 0,
    shovelIndex: 0,
    ownedShovels: new Set(["s0"]),
    inventory: [],
    eggs: [],
    pets: [],
    pending: null,
    promoRedeemed: new Set(),
    combo: 0,
    feverUntil: 0,
    weatherId: "clear",
    weatherUntil: 0,
    wheelLastDay: "",
  };

  let digMg = null;

  function highestSequentialOwnedIndex() {
    let k = -1;
    for (let i = 0; i < SHOVELS.length; i++) {
      if (state.ownedShovels.has(SHOVELS[i].id)) k = i;
      else break;
    }
    return k;
  }

  function enforceSequentialOwnership() {
    const k = highestSequentialOwnedIndex();
    for (let i = k + 1; i < SHOVELS.length; i++) {
      state.ownedShovels.delete(SHOVELS[i].id);
    }
  }

  function syncEquippedToBestOwned() {
    const k = highestSequentialOwnedIndex();
    state.shovelIndex = k >= 0 ? k : 0;
  }

  function nextShovelIndexToBuy() {
    const k = highestSequentialOwnedIndex();
    if (k >= SHOVELS.length - 1) return -1;
    return k + 1;
  }

  function migratePending(data) {
    if (!data || typeof data.r !== "number") return null;
    const r = clampR(data.r);
    const t = data.type === "egg" ? "egg" : "chest";
    const mut = data.mut != null ? String(data.mut) : "";
    const w = data.w != null ? String(data.w) : "";
    return { type: t, r, mut, w };
  }

  function load() {
    try {
      let raw = localStorage.getItem(SAVE_KEY);
      let fromLegacy = false;
      if (!raw) {
        raw = localStorage.getItem(SAVE_KEY_LEGACY);
        fromLegacy = !!raw;
      }
      if (raw) {
        const data = JSON.parse(raw);
        state.gold = sanitizeGold(data.gold);
        state.shovelIndex = Math.min(SHOVELS.length - 1, Math.max(0, Number(data.shovelIndex) || 0));
        state.ownedShovels = normalizeOwnedShovels(data.owned);
        state.inventory = Array.isArray(data.inv)
          ? data.inv.map((it) => ({ ...it, r: clampR(it.r) }))
          : [];
        state.eggs = Array.isArray(data.eggs)
          ? data.eggs.map((e) => ({ ...e, r: clampR(e.r) }))
          : [];
        state.pets = Array.isArray(data.pets)
          ? data.pets.map((p) => ({ ...p, r: clampR(p.r) }))
          : [];
        state.pending = data.pending ? migratePending(data.pending) : null;
        state.promoRedeemed = new Set(Array.isArray(data.promos) ? data.promos : []);
        state.combo = Math.max(0, Math.min(999, Number(data.combo) || 0));
        state.feverUntil = Math.max(0, Number(data.feverUntil) || 0);
        state.weatherId = typeof data.weatherId === "string" ? data.weatherId : "clear";
        state.weatherUntil = Math.max(0, Number(data.weatherUntil) || 0);
        state.wheelLastDay = typeof data.wheelLastDay === "string" ? data.wheelLastDay : "";

        enforceSequentialOwnership();
        syncEquippedToBestOwned();
        if (fromLegacy) save();
        return;
      }

      const rawV1 = localStorage.getItem("chest-rng-save-v1");
      if (rawV1) {
        const d = JSON.parse(rawV1);
        state.gold = sanitizeGold(d.gold);
        state.shovelIndex = Math.min(SHOVELS.length - 1, Math.max(0, Number(d.shovelIndex) || 0));
        state.ownedShovels = normalizeOwnedShovels(d.owned);
        state.inventory = Array.isArray(d.inv) ? d.inv.map((it) => ({ ...it, r: clampR(it.r) })) : [];
        state.eggs = [];
        state.pets = [];
        state.pending =
          d.pending && typeof d.pending.r === "number" ? { type: "chest", r: clampR(d.pending.r) } : null;
        state.promoRedeemed = new Set();
        state.combo = 0;
        state.feverUntil = 0;
        state.weatherId = "clear";
        state.weatherUntil = 0;
        state.wheelLastDay = "";
        enforceSequentialOwnership();
        syncEquippedToBestOwned();
        save();
        return;
      }

      state.gold = 120;
    } catch (_) {}
  }

  function save() {
    const payload = {
      gold: state.gold,
      shovelIndex: state.shovelIndex,
      owned: Array.from(state.ownedShovels),
      inv: state.inventory,
      eggs: state.eggs,
      pets: state.pets,
      pending: state.pending
        ? { type: state.pending.type, r: state.pending.r, mut: state.pending.mut || "", w: state.pending.w || "" }
        : null,
      promos: Array.from(state.promoRedeemed),
      combo: state.combo,
      feverUntil: state.feverUntil,
      weatherId: state.weatherId,
      weatherUntil: state.weatherUntil,
      wheelLastDay: state.wheelLastDay,
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("chest-rng: save failed", err);
    }
  }

  const el = {
    gold: document.getElementById("gold"),
    luck: document.getElementById("luck"),
    comboCount: document.getElementById("comboCount"),
    statFeverWrap: document.getElementById("statFeverWrap"),
    feverTimer: document.getElementById("feverTimer"),
    weatherLabel: document.getElementById("weatherLabel"),
    btnDig: document.getElementById("btnDig"),
    chestPlaceholder: document.getElementById("chestPlaceholder"),
    chestReveal: document.getElementById("chestReveal"),
    chestVisual: document.getElementById("chestVisual"),
    chestKindLabel: document.getElementById("chestKindLabel"),
    chestRarityName: document.getElementById("chestRarityName"),
    chestActions: document.getElementById("chestActions"),
    btnOpen: document.getElementById("btnOpen"),
    btnSkip: document.getElementById("btnSkip"),
    inventory: document.getElementById("inventory"),
    emptyInv: document.getElementById("emptyInv"),
    eggList: document.getElementById("eggList"),
    emptyEggs: document.getElementById("emptyEggs"),
    petList: document.getElementById("petList"),
    emptyPets: document.getElementById("emptyPets"),
    shopList: document.getElementById("shopList"),
    shovelName: document.getElementById("shovelName"),
    btnSellAll: document.getElementById("btnSellAll"),
    toastHost: document.getElementById("toastHost"),
    statPassiveWrap: document.getElementById("statPassiveWrap"),
    passiveRate: document.getElementById("passiveRate"),
    digOverlay: document.getElementById("digMinigameOverlay"),
    digMarker: document.getElementById("digMarker"),
    digZone: document.getElementById("digZone"),
    digHits: document.getElementById("digHits"),
    digNeed: document.getElementById("digNeed"),
    btnMinigameHit: document.getElementById("btnMinigameHit"),
    btnMinigameCancel: document.getElementById("btnMinigameCancel"),
    btnResetProgress: document.getElementById("btnResetProgress"),
    promoOverlay: document.getElementById("promoOverlay"),
    promoInput: document.getElementById("promoInput"),
    btnPromoOpen: document.getElementById("btnPromoOpen"),
    btnPromoApply: document.getElementById("btnPromoApply"),
    btnPromoClose: document.getElementById("btnPromoClose"),
    btnDailyWheel: document.getElementById("btnDailyWheel"),
    dailyWheelOverlay: document.getElementById("dailyWheelOverlay"),
    wheelHint: document.getElementById("wheelHint"),
    wheelDisk: document.getElementById("wheelDisk"),
    wheelResult: document.getElementById("wheelResult"),
    btnWheelSpin: document.getElementById("btnWheelSpin"),
    btnWheelClose: document.getElementById("btnWheelClose"),
  };

  function currentLuck() {
    return SHOVELS[state.shovelIndex].luck;
  }

  function isFeverActive(now) {
    return (state.feverUntil || 0) > (now || performance.now());
  }

  function feverRemainingSec(now) {
    const left = (state.feverUntil || 0) - (now || performance.now());
    return Math.max(0, Math.ceil(left / 1000));
  }

  function getWeatherById(id) {
    return WEATHER_EVENTS.find((w) => w.id === id) || WEATHER_EVENTS[0];
  }

  function pickMutationName(w) {
    const arr = w && Array.isArray(w.mutNames) && w.mutNames.length ? w.mutNames : ["Мутированный"];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function ensureWeatherStarted() {
    const w = getWeatherById(state.weatherId);
    if (!state.weatherUntil || state.weatherUntil <= 0) {
      state.weatherId = w.id;
      state.weatherUntil = performance.now() + (WEATHER_MIN_MS + Math.random() * (WEATHER_MAX_MS - WEATHER_MIN_MS));
      save();
    }
  }

  function currentWeather(now) {
    const n = now || performance.now();
    if (state.weatherUntil && n > state.weatherUntil) {
      rollNextWeather(n);
    }
    return getWeatherById(state.weatherId);
  }

  function rollNextWeather(now) {
    const n = now || performance.now();
    const w = WEATHER_EVENTS[Math.floor(Math.random() * WEATHER_EVENTS.length)];
    state.weatherId = w.id;
    state.weatherUntil = n + (WEATHER_MIN_MS + Math.random() * (WEATHER_MAX_MS - WEATHER_MIN_MS));
    save();
    renderGold();
    toast("Погода изменилась: " + w.icon + " " + w.name);
  }

  function applyWeatherToChestRarity(r, w) {
    return clampR(r + (w && typeof w.chestShift === "number" ? w.chestShift : 0));
  }

  function maybeMutateChestPending(pending, w) {
    if (!pending || pending.type !== "chest") return pending;
    const chance = w && typeof w.chestMutChance === "number" ? w.chestMutChance : 0;
    if (Math.random() >= chance) return pending;
    const mut = pickMutationName(w);
    return { ...pending, mut, w: w ? w.id : "" };
  }

  function maybeMutateItemDrop(drop, w) {
    const chance = w && typeof w.itemMutChance === "number" ? w.itemMutChance : 0;
    if (Math.random() >= chance) return drop;
    const mut = pickMutationName(w);
    const shift = w && typeof w.itemShift === "number" ? w.itemShift : 0;
    const mul = w && typeof w.itemPriceMul === "number" ? w.itemPriceMul : 1.15;
    const newR = clampR((drop.r | 0) + shift);
    return {
      ...drop,
      r: newR,
      mut,
      mul,
      name: drop.name + " · " + mut,
    };
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    el.toastHost.appendChild(t);
    setTimeout(() => t.remove(), 3400);
  }

  function localDayKey(d) {
    const x = d instanceof Date ? d : new Date();
    const yyyy = String(x.getFullYear());
    const mm = String(x.getMonth() + 1).padStart(2, "0");
    const dd = String(x.getDate()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd;
  }

  function canSpinWheelToday() {
    return state.wheelLastDay !== localDayKey();
  }

  function openDailyWheel() {
    if (!el.dailyWheelOverlay) return;
    el.dailyWheelOverlay.classList.remove("hidden");
    el.dailyWheelOverlay.setAttribute("aria-hidden", "false");
    el.dailyWheelOverlay.setAttribute("aria-modal", "true");
    if (el.wheelHint) {
      el.wheelHint.textContent = canSpinWheelToday()
        ? "Крути 1 раз в день и получай награду."
        : "Ты уже крутил сегодня. Приходи завтра!";
    }
    if (el.wheelResult) el.wheelResult.textContent = "Выпало: —";
    if (el.btnWheelSpin) el.btnWheelSpin.disabled = !canSpinWheelToday();
  }

  function closeDailyWheel() {
    if (!el.dailyWheelOverlay) return;
    el.dailyWheelOverlay.classList.add("hidden");
    el.dailyWheelOverlay.setAttribute("aria-hidden", "true");
    el.dailyWheelOverlay.removeAttribute("aria-modal");
  }

  function wheelRewardTable() {
    return [
      { id: "gold_small", label: "+500 🪙", w: 28 },
      { id: "gold_mid", label: "+2 500 🪙", w: 20 },
      { id: "gold_big", label: "+15 000 🪙", w: 10 },
      { id: "egg", label: "Яйцо", w: 18 },
      { id: "items", label: "3 предмета", w: 16 },
      { id: "fever", label: "Fever 15с", w: 8 },
    ];
  }

  function pickWheelReward() {
    const t = wheelRewardTable();
    const idx = pickWeighted(t.map((x) => x.w));
    return { reward: t[idx], idx, total: t.length };
  }

  function applyWheelReward(reward) {
    const now = performance.now();
    const w = currentWeather(now);
    if (!reward) return;
    if (reward.id === "gold_small") {
      state.gold = sanitizeGold(state.gold + 500);
      toast("Колесо: +500 🪙");
    } else if (reward.id === "gold_mid") {
      state.gold = sanitizeGold(state.gold + 2500);
      toast("Колесо: +2 500 🪙");
    } else if (reward.id === "gold_big") {
      state.gold = sanitizeGold(state.gold + 15000);
      toast("Колесо: +15 000 🪙");
    } else if (reward.id === "egg") {
      let r = rollChestRarity(currentLuck());
      r = applyWeatherToChestRarity(r, w);
      state.eggs.push({ id: uid("e"), r });
      toast("Колесо: яйцо «" + RARITIES[r].name + "»!");
    } else if (reward.id === "items") {
      const sourceR = 4;
      const drops = [];
      for (let i = 0; i < 3; i++) {
        const rr = rollLootRarityFromSource(sourceR);
        const base = { id: uid("it"), r: rr, name: randomFromPool(ITEM_POOLS, rr), mut: "", mul: 1 };
        drops.push(maybeMutateItemDrop(base, w));
      }
      state.inventory.push(...drops);
      toast("Колесо: 3 предмета в инвентарь!");
    } else if (reward.id === "fever") {
      state.combo = 0;
      state.feverUntil = Math.max(state.feverUntil || 0, now + 15000);
      toast("Колесо: Fever Mode на 15 секунд!");
    } else {
      toast("Колесо: ничего не выпало… (странно)");
    }
    save();
    renderGold();
    renderInventory();
    renderEggs();
    renderPets();
    renderShop();
  }

  function spinWheel() {
    if (!canSpinWheelToday()) {
      toast("Колесо уже было сегодня. Приходи завтра!");
      return;
    }
    const picked = pickWheelReward();
    const reward = picked.reward;
    state.wheelLastDay = localDayKey();
    if (el.btnWheelSpin) el.btnWheelSpin.disabled = true;
    if (el.wheelDisk) {
      const N = picked.total || 6;
      const step = 360 / N;
      const jitter = (Math.random() * 0.6 - 0.3) * step;
      const targetCenter = picked.idx * step + step / 2 + jitter;
      const turns = 6 + Math.floor(Math.random() * 4);
      const deg = turns * 360 + (360 - targetCenter);
      el.wheelDisk.style.transform = "rotate(" + deg + "deg)";
    }
    save();
    if (el.wheelResult) el.wheelResult.textContent = "Выпало: …";
    const finish = () => {
      if (el.wheelDisk) el.wheelDisk.removeEventListener("transitionend", finish);
      if (el.wheelResult) el.wheelResult.textContent = "Выпало: " + reward.label;
      applyWheelReward(reward);
      if (el.wheelHint) el.wheelHint.textContent = "Ты уже крутил сегодня. Приходи завтра!";
    };
    if (el.wheelDisk) {
      el.wheelDisk.addEventListener("transitionend", finish, { once: true });
    } else {
      finish();
    }
  }

  function normalizePromoCode(s) {
    return String(s || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");
  }

  function openPromoModal() {
    if (!el.promoOverlay) return;
    el.promoOverlay.classList.remove("hidden");
    el.promoOverlay.setAttribute("aria-hidden", "false");
    el.promoOverlay.setAttribute("aria-modal", "true");
    if (el.promoInput) {
      el.promoInput.value = "";
      el.promoInput.focus();
    }
  }

  function closePromoModal() {
    if (!el.promoOverlay) return;
    el.promoOverlay.classList.add("hidden");
    el.promoOverlay.setAttribute("aria-hidden", "true");
    el.promoOverlay.removeAttribute("aria-modal");
  }

  function tryRedeemPromo() {
    const raw = el.promoInput ? el.promoInput.value : "";
    const code = normalizePromoCode(raw);
    if (!code) {
      toast("Введите промокод.");
      return;
    }
    if (state.promoRedeemed.has(code)) {
      toast("Этот код уже был активирован.");
      return;
    }
    const def = PROMO_DEFINITIONS[code];
    if (!def) {
      toast("Такого промокода нет.");
      return;
    }
    state.promoRedeemed.add(code);
    if (def.gold) state.gold = sanitizeGold(state.gold + def.gold);
    if (def.shovelId && SHOVEL_IDS.has(def.shovelId)) {
      const ti = SHOVELS.findIndex((x) => x.id === def.shovelId);
      if (ti >= 0) {
        for (let i = 0; i <= ti; i++) state.ownedShovels.add(SHOVELS[i].id);
      }
    }
    enforceSequentialOwnership();
    syncEquippedToBestOwned();
    save();
    renderGold();
    renderShop();
    toast(def.msg || "Промокод применён.");
    closePromoModal();
  }

  function renderGold() {
    el.gold.textContent = Math.floor(state.gold).toLocaleString("ru-RU");
    el.luck.textContent = String(currentLuck());
    el.shovelName.textContent = SHOVELS[state.shovelIndex].name;
    if (el.comboCount) el.comboCount.textContent = String(state.combo | 0);
    if (el.weatherLabel) {
      const w = getWeatherById(state.weatherId);
      el.weatherLabel.textContent = w.icon + " " + w.name;
    }
    if (el.statFeverWrap && el.feverTimer) {
      if (isFeverActive()) {
        el.statFeverWrap.classList.remove("hidden");
        el.feverTimer.textContent = String(feverRemainingSec());
      } else {
        el.statFeverWrap.classList.add("hidden");
      }
    }
    const passive = totalPassiveGoldPerSec();
    if (passive > 0.0001) {
      el.statPassiveWrap.classList.remove("hidden");
      el.passiveRate.textContent = formatIncomeRate(passive);
    } else {
      el.statPassiveWrap.classList.add("hidden");
    }
  }

  function shovelColorClass(idx) {
    const step = (SHOVELS.length - 1) || 1;
    return Math.min(RARITY_MAX, Math.floor((idx / step) * RARITY_MAX));
  }

  function setPendingUI() {
    const p = state.pending;
    if (p) {
      const isEgg = p.type === "egg";
      el.chestPlaceholder.classList.add("hidden");
      el.chestReveal.classList.remove("hidden");
      el.chestVisual.textContent = isEgg ? EGG_ICONS[p.r] : CHEST_ICONS[p.r];
      el.chestKindLabel.textContent = isEgg ? "Яйцо питомца" : "Сундук";
      el.chestRarityName.textContent = (p.mut ? p.mut + " · " : "") + RARITIES[p.r].name;
      el.chestRarityName.className = "rarity-badge bg-rarity--" + p.r + " rarity--" + p.r;
      el.chestActions.classList.remove("hidden");
      el.btnDig.disabled = !!digMg;
      el.btnOpen.textContent = isEgg ? "Вылупить" : "Открыть";
    } else {
      el.chestPlaceholder.classList.remove("hidden");
      el.chestReveal.classList.add("hidden");
      el.chestActions.classList.add("hidden");
      el.btnDig.disabled = !!digMg;
      el.btnOpen.textContent = "Открыть";
    }
  }

  function renderInventory() {
    el.inventory.innerHTML = "";
    if (state.inventory.length === 0) {
      el.emptyInv.classList.remove("hidden");
      return;
    }
    el.emptyInv.classList.add("hidden");
    for (const item of state.inventory) {
      const r = clampR(item.r);
      const li = document.createElement("li");
      li.className = "inv-item";
      const info = document.createElement("div");
      info.className = "inv-item-info";
      const ico = document.createElement("span");
      ico.className = "inv-ico";
      ico.textContent = ITEM_ICONS[r];
      const name = document.createElement("span");
      name.className = "inv-name rarity--" + r;
      name.textContent = item.name;
      info.appendChild(ico);
      info.appendChild(name);
      const actions = document.createElement("div");
      actions.className = "inv-actions";
      const price = document.createElement("span");
      price.className = "price-tag";
      const mul = item && typeof item.mul === "number" && Number.isFinite(item.mul) ? item.mul : 1;
      price.textContent = Math.floor(sellPrice(r) * mul) + " 🪙";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-small btn-primary";
      btn.textContent = "Продать";
      btn.addEventListener("click", () => sellOne(item.id));
      actions.appendChild(price);
      actions.appendChild(btn);
      li.appendChild(info);
      li.appendChild(actions);
      el.inventory.appendChild(li);
    }
  }

  function renderEggs() {
    el.eggList.innerHTML = "";
    if (state.eggs.length === 0) {
      el.emptyEggs.classList.remove("hidden");
      return;
    }
    el.emptyEggs.classList.add("hidden");
    for (const egg of state.eggs) {
      const r = clampR(egg.r);
      const li = document.createElement("li");
      li.className = "inv-item";
      const info = document.createElement("div");
      info.className = "inv-item-info";
      const ico = document.createElement("span");
      ico.className = "inv-ico";
      ico.textContent = EGG_ICONS[r];
      const name = document.createElement("span");
      name.className = "inv-name rarity--" + r;
      name.textContent = "Яйцо · " + RARITIES[r].name;
      info.appendChild(ico);
      info.appendChild(name);
      const actions = document.createElement("div");
      actions.className = "inv-actions";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-small btn-primary";
      btn.textContent = "Вылупить";
      btn.addEventListener("click", () => hatchEggFromStash(egg.id));
      actions.appendChild(btn);
      li.appendChild(info);
      li.appendChild(actions);
      el.eggList.appendChild(li);
    }
  }

  function renderPets() {
    el.petList.innerHTML = "";
    if (state.pets.length === 0) {
      el.emptyPets.classList.remove("hidden");
      return;
    }
    el.emptyPets.classList.add("hidden");
    for (const pet of state.pets) {
      const r = clampR(pet.r);
      const li = document.createElement("li");
      li.className = "inv-item";
      const info = document.createElement("div");
      info.className = "inv-item-info";
      const ico = document.createElement("span");
      ico.className = "inv-ico";
      ico.textContent = PET_FACE_ICONS[r];
      const meta = document.createElement("div");
      meta.style.minWidth = "0";
      meta.style.flex = "1";
      const name = document.createElement("span");
      name.className = "inv-name rarity--" + r;
      name.textContent = pet.name;
      const inc = document.createElement("div");
      inc.className = "pet-income";
      inc.textContent = "+" + formatIncomeRate(petIncomePerSec(r)) + " 🪙/с";
      meta.appendChild(name);
      meta.appendChild(inc);
      info.appendChild(ico);
      info.appendChild(meta);
      const actions = document.createElement("div");
      actions.className = "inv-actions";
      const price = document.createElement("span");
      price.className = "price-tag";
      price.textContent = "+" + petReleasePrice(r) + " 🪙";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-small btn-ghost";
      btn.textContent = "Отпустить";
      btn.addEventListener("click", () => releasePet(pet.id));
      actions.appendChild(price);
      actions.appendChild(btn);
      li.appendChild(info);
      li.appendChild(actions);
      el.petList.appendChild(li);
    }
  }

  function renderShop() {
    el.shopList.innerHTML = "";
    const seq = highestSequentialOwnedIndex();
    const nextBuy = nextShovelIndexToBuy();
    SHOVELS.forEach((s, idx) => {
      const inCollection = idx <= seq;
      const isEquipped = idx === state.shovelIndex && inCollection;
      const isNextToBuy = nextBuy >= 0 && idx === nextBuy;

      const li = document.createElement("li");
      li.className =
        "shop-item" + (inCollection ? " owned" : "") + (isEquipped ? " equipped" : "") + (!inCollection && !isNextToBuy ? " shop-locked" : "");
      const left = document.createElement("div");
      left.className = "shop-item-main";
      const title = document.createElement("div");
      const rc = shovelColorClass(idx);
      title.innerHTML =
        "<strong class='rarity--" +
        rc +
        "'>" +
        escapeHtml(s.name) +
        "</strong>" +
        "<div class='shop-desc'>" +
        escapeHtml(s.desc) +
        " Удача +" +
        s.luck +
        "%.</div>";
      left.appendChild(title);
      const right = document.createElement("div");
      right.className = "shop-item-actions";
      if (inCollection) {
        const tag = document.createElement("span");
        tag.className = "shop-status-tag" + (isEquipped ? " shop-status-tag--active" : "");
        tag.textContent = isEquipped ? "Используется" : "Получено";
        right.appendChild(tag);
      } else if (isNextToBuy) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-small btn-primary shop-buy-btn";
        btn.textContent = s.price === 0 ? "Бесплатно" : s.price.toLocaleString("ru-RU") + " 🪙";
        btn.disabled = !canAfford(s.price);
        btn.dataset.shopBuy = String(idx);
        right.appendChild(btn);
      } else {
        const tag = document.createElement("span");
        tag.className = "shop-locked-hint";
        tag.textContent = "Сначала купи предыдущую";
        right.appendChild(tag);
      }
      li.appendChild(left);
      li.appendChild(right);
      el.shopList.appendChild(li);
    });
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function buyShovel(idx) {
    const s = SHOVELS[idx];
    if (!s) return;
    const next = nextShovelIndexToBuy();
    if (idx !== next) {
      toast("Лопаты покупаются только по порядку — сначала предыдущая в списке.");
      return;
    }
    if (state.ownedShovels.has(s.id)) {
      syncEquippedToBestOwned();
      renderShop();
      return;
    }
    if (!canAfford(s.price)) {
      toast("Не хватает золота.");
      return;
    }
    state.gold = sanitizeGold(state.gold - s.price);
    state.ownedShovels.add(s.id);
    syncEquippedToBestOwned();
    save();
    renderGold();
    renderShop();
    toast("Куплено: " + s.name);
  }

  function sellOne(id) {
    const i = state.inventory.findIndex((x) => x.id === id);
    if (i < 0) return;
    const item = state.inventory[i];
    const r = clampR(item.r);
    const mul = item && typeof item.mul === "number" && Number.isFinite(item.mul) ? item.mul : 1;
    const price = Math.floor(sellPrice(r) * mul);
    state.gold += price;
    state.inventory.splice(i, 1);
    save();
    renderGold();
    renderInventory();
    renderShop();
    toast("Продано за " + price + " 🪙");
  }

  function sellAll() {
    if (state.inventory.length === 0) return;
    let sum = 0;
    for (const it of state.inventory) {
      const mul = it && typeof it.mul === "number" && Number.isFinite(it.mul) ? it.mul : 1;
      sum += Math.floor(sellPrice(clampR(it.r)) * mul);
    }
    state.gold += sum;
    state.inventory = [];
    save();
    renderGold();
    renderInventory();
    renderShop();
    toast("Продано всё за " + sum.toLocaleString("ru-RU") + " 🪙");
  }

  function addPetFromEgg(eggR) {
    const pr = rollLootRarityFromSource(eggR);
    const name = randomFromPool(PET_POOLS, pr);
    state.pets.push({ id: uid("p"), r: pr, name });
  }

  function hatchEggFromStash(eggId) {
    const i = state.eggs.findIndex((e) => e.id === eggId);
    if (i < 0) return;
    const egg = state.eggs[i];
    state.eggs.splice(i, 1);
    addPetFromEgg(egg.r);
    save();
    renderEggs();
    renderPets();
    renderShop();
    toast("Питомец вылупился!");
  }

  function releasePet(petId) {
    const i = state.pets.findIndex((p) => p.id === petId);
    if (i < 0) return;
    const pet = state.pets[i];
    const r = clampR(pet.r);
    const g = petReleasePrice(r);
    state.gold += g;
    state.pets.splice(i, 1);
    save();
    renderGold();
    renderPets();
    renderShop();
    toast("Отпущен за " + g + " 🪙");
  }

  function maybeBonusEgg(chestR) {
    const chance = 0.08 + chestR * 0.012 + currentLuck() * 0.00035;
    if (Math.random() < chance) {
      const er = rollLootRarityFromSource(chestR);
      state.eggs.push({ id: uid("e"), r: er });
      toast("Бонус: яйцо «" + RARITIES[er].name + "» в запас!");
    }
  }

  function closeDigMinigame() {
    if (digMg) {
      cancelAnimationFrame(digMg.rafId);
    }
    digMg = null;
    el.digOverlay.classList.add("hidden");
    el.digOverlay.setAttribute("aria-hidden", "true");
    el.digOverlay.removeAttribute("aria-modal");
    el.digMarker.classList.remove("miss", "hit");
    setPendingUI();
  }

  function digMinigameLoop(now) {
    if (!digMg) return;
    const dt = Math.min(0.05, (now - digMg.lastNow) / 1000);
    digMg.lastNow = now;
    digMg.angle += digMg.cps * Math.PI * 2 * dt;
    const pos = (Math.sin(digMg.angle) + 1) / 2;
    digMg.pos = pos;
    el.digMarker.style.left = pos * 100 + "%";
    digMg.rafId = requestAnimationFrame(digMinigameLoop);
  }

  function openDigMinigame() {
    const luck = currentLuck();
    const need = Math.max(2, Math.min(4, 4 - Math.floor(luck / 32)));
    const zoneW = 0.13 + Math.min(0.17, luck * 0.00125);
    const cps = Math.max(0.36, Math.min(0.78, 0.68 - luck * 0.0028));
    digMg = {
      need,
      hits: 0,
      misses: 0,
      zoneW,
      cps,
      angle: Math.random() * Math.PI * 2,
      startNow: performance.now(),
      lastNow: performance.now(),
      rafId: 0,
      pos: 0,
    };
    el.digNeed.textContent = String(need);
    el.digHits.textContent = "0";
    el.digZone.style.width = zoneW * 100 + "%";
    el.digZone.style.left = (0.5 - zoneW / 2) * 100 + "%";
    el.digOverlay.classList.remove("hidden");
    el.digOverlay.setAttribute("aria-hidden", "false");
    el.digOverlay.setAttribute("aria-modal", "true");
    el.btnDig.disabled = true;
    digMg.rafId = requestAnimationFrame(digMinigameLoop);
  }

  function onMinigameHit() {
    if (!digMg) return;
    const half = digMg.zoneW / 2;
    const pad = 0.032;
    const p = digMg.pos;
    const ok = p >= 0.5 - half - pad && p <= 0.5 + half + pad;
    el.digMarker.classList.remove("miss", "hit");
    void el.digMarker.offsetWidth;
    if (ok) {
      digMg.hits++;
      el.digHits.textContent = String(digMg.hits);
      el.digMarker.classList.add("hit");
      if (digMg.hits >= digMg.need) {
        const result = { startNow: digMg.startNow, misses: digMg.misses };
        closeDigMinigame();
        applyDigReward(result);
      }
    } else {
      digMg.misses++;
      el.digMarker.classList.add("miss");
      if (state.combo !== 0) {
        state.combo = 0;
        save();
        renderGold();
      }
      toast("Мимо — жди зелёную зону!");
    }
  }

  function cancelDigMinigame() {
    if (!digMg) return;
    closeDigMinigame();
    if (state.combo !== 0) {
      state.combo = 0;
      save();
      renderGold();
    }
    toast("Ушли из шахты без добычи.");
  }

  function applyDigReward(digResult) {
    const luck = currentLuck();
    const eggChance = 0.18 + Math.min(0.12, luck * 0.0008);

    const now = performance.now();
    const startNow = digResult && typeof digResult.startNow === "number" ? digResult.startNow : null;
    const misses = digResult && typeof digResult.misses === "number" ? digResult.misses : null;
    const fastClear = startNow != null ? now - startNow <= FEVER_FAST_CLEAR_MS : false;
    const flawless = misses != null ? (misses | 0) === 0 : false;
    const perfect = flawless || fastClear;
    if (perfect) {
      state.combo = Math.min(999, (state.combo | 0) + 1);
      if (state.combo >= FEVER_COMBO_TARGET && !isFeverActive(now)) {
        state.feverUntil = now + FEVER_DURATION_MS;
        toast("Fever Mode! Сундуки на +1 ранг (" + Math.ceil(FEVER_DURATION_MS / 1000) + "с).");
      } else {
        toast("Комбо +" + state.combo + (fastClear && !flawless ? " (быстро!)" : flawless ? " (без промахов!)" : ""));
      }
    } else {
      state.combo = 0;
    }

    const w = currentWeather(now);
    if (Math.random() < eggChance) {
      const r = rollChestRarity(luck);
      state.pending = { type: "egg", r, mut: "", w: w ? w.id : "" };
      save();
      setPendingUI();
      renderGold();
      toast("Найдено яйцо: " + RARITIES[r].name + "!");
    } else {
      let r = rollChestRarity(luck);
      if (isFeverActive(now)) r = clampR(r + 1);
      r = applyWeatherToChestRarity(r, w);
      state.pending = maybeMutateChestPending({ type: "chest", r, mut: "", w: w ? w.id : "" }, w);
      save();
      setPendingUI();
      renderGold();
      toast("Выпал сундук: " + RARITIES[r].name + "!");
    }
  }

  function startDig() {
    if (digMg) return;
    if (state.pending) {
      toast("Сначала открой награду или нажми «Пропустить».");
      return;
    }
    openDigMinigame();
  }

  function openPending() {
    const p = state.pending;
    if (!p) return;
    if (p.type === "egg") {
      addPetFromEgg(p.r);
      state.pending = null;
      save();
      setPendingUI();
      renderPets();
      renderShop();
      toast("Питомец вылупился из яйца!");
      return;
    }
    const chestR = p.r;
    const count = 3 + Math.floor(Math.random() * 3);
    const drops = [];
    const w = getWeatherById((p && p.w) || state.weatherId);
    for (let n = 0; n < count; n++) {
      const r = rollLootRarityFromSource(chestR);
      const base = {
        id: uid("it"),
        r,
        name: randomFromPool(ITEM_POOLS, r),
        mut: "",
        mul: 1,
      };
      drops.push(maybeMutateItemDrop(base, w));
    }
    state.inventory.push(...drops);
    state.pending = null;
    maybeBonusEgg(chestR);
    save();
    setPendingUI();
    renderInventory();
    renderEggs();
    renderShop();
    toast("Из сундука выпало предметов: " + count);
  }

  function skipPending() {
    if (!state.pending) return;
    state.pending = null;
    save();
    setPendingUI();
    toast("Пропущено.");
  }

  function bindShopList() {
    el.shopList.addEventListener("click", function (e) {
      let node = e.target;
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      if (!(node instanceof Element)) return;
      const buyBtn = node.closest("[data-shop-buy]");
      if (buyBtn) {
        e.preventDefault();
        if (buyBtn.disabled) return;
        const idx = parseInt(buyBtn.getAttribute("data-shop-buy"), 10);
        if (!Number.isNaN(idx)) buyShovel(idx);
        return;
      }
    });
  }

  function resetProgress() {
    if (!window.confirm("Сбросить весь прогресс? Действие нельзя отменить.")) return;
    try {
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem(SAVE_KEY_LEGACY);
      localStorage.removeItem("chest-rng-save-v1");
    } catch (err) {
      console.warn("chest-rng: clear storage failed", err);
    }
    if (digMg) {
      if (digMg.rafId != null) cancelAnimationFrame(digMg.rafId);
      digMg = null;
      el.digOverlay.classList.add("hidden");
      el.digOverlay.setAttribute("aria-hidden", "true");
      el.digOverlay.removeAttribute("aria-modal");
    }
    state.gold = 120;
    state.shovelIndex = 0;
    state.ownedShovels = new Set(["s0"]);
    state.inventory = [];
    state.eggs = [];
    state.pets = [];
    state.pending = null;
    state.promoRedeemed = new Set();
    state.combo = 0;
    state.feverUntil = 0;
    state.weatherId = "clear";
    state.weatherUntil = 0;
    state.wheelLastDay = "";
    syncEquippedToBestOwned();
    save();
    renderGold();
    setPendingUI();
    renderInventory();
    renderEggs();
    renderPets();
    renderShop();
    toast("Прогресс сброшен.");
  }

  function bind() {
    el.btnDig.addEventListener("click", startDig);
    el.btnOpen.addEventListener("click", openPending);
    el.btnSkip.addEventListener("click", skipPending);
    el.btnSellAll.addEventListener("click", sellAll);
    el.btnMinigameHit.addEventListener("click", onMinigameHit);
    el.btnMinigameCancel.addEventListener("click", cancelDigMinigame);
    bindShopList();
    if (el.btnResetProgress) el.btnResetProgress.addEventListener("click", resetProgress);
    if (el.btnPromoOpen) el.btnPromoOpen.addEventListener("click", openPromoModal);
    if (el.btnPromoApply) el.btnPromoApply.addEventListener("click", tryRedeemPromo);
    if (el.btnPromoClose) el.btnPromoClose.addEventListener("click", closePromoModal);
    if (el.btnDailyWheel) el.btnDailyWheel.addEventListener("click", openDailyWheel);
    if (el.btnWheelSpin) el.btnWheelSpin.addEventListener("click", spinWheel);
    if (el.btnWheelClose) el.btnWheelClose.addEventListener("click", closeDailyWheel);
    if (el.promoOverlay) {
      el.promoOverlay.addEventListener("click", function (e) {
        if (e.target === el.promoOverlay) closePromoModal();
      });
    }
    if (el.dailyWheelOverlay) {
      el.dailyWheelOverlay.addEventListener("click", function (e) {
        if (e.target === el.dailyWheelOverlay) closeDailyWheel();
      });
    }
    if (el.promoInput) {
      el.promoInput.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
          e.preventDefault();
          tryRedeemPromo();
        }
      });
    }
    document.addEventListener("keydown", function (e) {
      if (el.promoOverlay && !el.promoOverlay.classList.contains("hidden")) {
        if (e.code === "Escape") {
          e.preventDefault();
          closePromoModal();
        }
        return;
      }
      if (el.dailyWheelOverlay && !el.dailyWheelOverlay.classList.contains("hidden")) {
        if (e.code === "Escape") {
          e.preventDefault();
          closeDailyWheel();
        }
        return;
      }
      if (!digMg || el.digOverlay.classList.contains("hidden")) return;
      if (e.code === "Space") {
        e.preventDefault();
        onMinigameHit();
      } else if (e.code === "Escape") {
        e.preventDefault();
        cancelDigMinigame();
      }
    });

    window.addEventListener("pagehide", function () {
      save();
    });
    window.addEventListener("beforeunload", function () {
      save();
    });
  }

  function startPassiveLoop() {
    let lastFrame = performance.now();
    let lastAutoSave = performance.now();
    function frame(now) {
      if (!document.hidden) {
        if (!state.weatherUntil || now > state.weatherUntil) rollNextWeather(now);
        const dt = Math.min(0.35, (now - lastFrame) / 1000);
        if (state.pets.length > 0 && dt > 0) {
          const goldBefore = Math.floor(state.gold);
          const affordSnap = snapshotUnownedAffordableSignature();
          state.gold += totalPassiveGoldPerSec() * dt;
          renderGold();
          if (
            Math.floor(state.gold) !== goldBefore ||
            snapshotUnownedAffordableSignature() !== affordSnap
          ) {
            renderShop();
          }
        }
        if (el.statFeverWrap && !el.statFeverWrap.classList.contains("hidden")) {
          el.feverTimer.textContent = String(feverRemainingSec(now));
          if (!isFeverActive(now)) renderGold();
        }
        if (now - lastAutoSave > 14000) {
          lastAutoSave = now;
          save();
        }
      }
      lastFrame = now;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function init() {
    load();
    ensureWeatherStarted();
    if (!localStorage.getItem(SAVE_KEY) && !localStorage.getItem(SAVE_KEY_LEGACY)) save();
    bind();
    renderGold();
    setPendingUI();
    renderInventory();
    renderEggs();
    renderPets();
    renderShop();
    startPassiveLoop();
  }

  init();
})();
