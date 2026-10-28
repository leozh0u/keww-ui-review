// KEWW form contract and original quiz behavior: Daniel Delgado's existing website (27 October 2026).
const fileRules = { resume: ['pdf', 'doc', 'docx'], tabc: ['pdf', 'jpg', 'jpeg', 'png'], foodHandler: ['pdf', 'jpg', 'jpeg', 'png'], coverLetterFile: ['pdf', 'doc', 'docx'] };
const stepNames = ['Personal information', 'Work preferences', 'Certifications', 'Skills quiz', 'References', 'Cover letter', 'Review'];

const formMessages = {
  "es": {
    "Personal information": "Información personal",
    "Work preferences": "Preferencias de trabajo",
    "Certifications": "Certificaciones",
    "Skills quiz": "Evaluación de conocimientos",
    "References": "Referencias",
    "Cover letter": "Carta de presentación",
    "Review": "Revisión",
    "Check the following before continuing:": "Revisa lo siguiente antes de continuar:",
    "{label}: complete this field.": "{label}: completa este campo.",
    "{label}: enter a valid email address.": "{label}: escribe un correo electrónico válido.",
    "{label}: enter a valid phone number.": "{label}: escribe un número de teléfono válido.",
    "Date of birth: enter a valid date in the past.": "Fecha de nacimiento: escribe una fecha válida que no sea futura.",
    "Choose a {types} file.": "Selecciona un archivo {types}.",
    "This file is empty. Choose a different file.": "Este archivo está vacío. Selecciona otro.",
    "Choose a file smaller than 10 MB.": "Selecciona un archivo de menos de 10 MB.",
    "Your files total more than 18 MB. Choose smaller files before continuing.": "Tus archivos superan los 18 MB en total. Selecciona archivos más pequeños antes de continuar.",
    "Reference: {id}": "Número de referencia: {id}",
    "Contact ": "Comunícate con ",
    " with this reference before submitting again.": " e indica este número de referencia antes de volver a enviar el formulario.",
    "You’re offline.": "No tienes conexión.",
    "Reconnect, then send this form. Your entries are still on this page.": "Vuelve a conectarte y envía el formulario. Tus datos siguen en esta página.",
    "Sending…": "Enviando…",
    "Application received for review.": "Solicitud recibida para revisión.",
    "Application received.": "Solicitud recibida.",
    "Inquiry received.": "Consulta recibida.",
    "KEWW received your application by email, but your worker profile needs a manual check. You do not need to submit again.": "KEWW recibió tu solicitud por correo electrónico, pero tu perfil necesita una revisión manual. No tienes que enviarla de nuevo.",
    "Thank you. KEWW has received your details. Keep your reference for any follow-up.": "Gracias. KEWW recibió tus datos. Conserva el número de referencia para cualquier consulta posterior.",
    "Not sent.": "No se ha enviado.",
    "Check the form and try again. Your entries are still on this page.": "Revisa el formulario y vuelve a intentarlo. Tus datos siguen en esta página.",
    "Check this field and try again.": "Revisa este campo y vuelve a intentarlo.",
    "Submissions are not open on this preview. Use the current KEWW form.": "Este sitio de prueba no acepta envíos. Usa el formulario actual de KEWW.",
    "The service is temporarily unavailable. Your details remain on this page; please try again later.": "El servicio no está disponible por el momento. Tus datos siguen en esta página; vuelve a intentarlo más tarde.",
    "Too many requests. Please try again later.": "Se han enviado demasiadas solicitudes. Vuelve a intentarlo más tarde.",
    "We need to check your submission.": "Tenemos que verificar tu envío.",
    "Please do not submit again yet. KEWW could not confirm every part of this request.": "No vuelvas a enviarlo todavía. KEWW no pudo confirmar todos los pasos de esta solicitud.",
    "We couldn’t confirm receipt.": "No pudimos confirmar la recepción.",
    "The connection ended before we could confirm the result. Keep this page open and do not submit a second form yet.": "La conexión se interrumpió antes de confirmar el resultado. Mantén esta página abierta y no envíes otro formulario todavía.",
    "See receipt below": "Ver comprobante",
    "Step {number}: {name}": "Paso {number}: {name}",
    "Reference {number}": "Referencia {number}",
    "Full name": "Nombre completo",
    "Company": "Empresa",
    "Email": "Correo electrónico",
    "Phone": "Teléfono",
    "How do they know you?": "¿Cuál es su relación contigo?",
    "Loading positions…": "Cargando puestos…",
    "There are no application positions available right now. You can try again later or contact KEWW.": "No hay puestos disponibles para solicitar en este momento. Puedes volver más tarde o comunicarte con KEWW.",
    "Select the positions you’re interested in. Availability depends on current opportunities.": "Selecciona los puestos que te interesan. La disponibilidad depende de las oportunidades actuales.",
    "Positions couldn’t be loaded. Try again before continuing; your other entries are still here.": "No se pudieron cargar los puestos. Vuelve a intentarlo antes de continuar; los demás datos siguen aquí.",
    "Loading questions…": "Cargando preguntas…",
    "Choose all that apply.": "Selecciona todas las respuestas que correspondan.",
    "{count} questions. Your answers stay selected when you go back to another step.": "{count} preguntas. Tus respuestas se conservan al volver a otro paso.",
    "Questions couldn’t be loaded. Try again before continuing.": "No se pudieron cargar las preguntas. Vuelve a intentarlo antes de continuar.",
    "Choose at least one available position. If positions haven’t loaded, select Try again.": "Selecciona al menos un puesto disponible. Si no se cargaron los puestos, pulsa Intentar de nuevo.",
    "Load the quiz questions before continuing.": "Carga las preguntas de la evaluación antes de continuar.",
    "Question {number}: choose an answer.": "Pregunta {number}: selecciona una respuesta.",
    "Not provided": "Sin indicar",
    "Name": "Nombre",
    "Date of birth": "Fecha de nacimiento",
    "Address": "Dirección",
    "Positions": "Puestos",
    "Availability": "Disponibilidad",
    "Preferred time": "Horario preferido",
    "Heard about KEWW": "Cómo conociste KEWW",
    "Certifications and résumé": "Certificaciones y currículum",
    "Food handler’s card": "Certificado de manipulación de alimentos",
    "Not attached": "Sin adjuntar",
    "Résumé": "Currículum",
    "Other certifications": "Otras certificaciones",
    "None selected": "Ninguna seleccionada",
    "Questions": "Preguntas",
    "{answered} of {total} answered": "{answered} de {total} respondidas",
    "Professional references": "Referencias profesionales",
    "Text": "Texto",
    "File": "Archivo",
    "Edit {section}": "Editar: {section}",
    "Edit": "Editar",
    "Event Server": "Servicio de mesas en eventos",
    "Server": "Servicio de mesas",
    "Event Bartender": "Servicio de bar en eventos",
    "Bartender": "Servicio de bar",
    "Event Help": "Apoyo en eventos",
    "Back of House": "Apoyo de cocina",
    "BOH": "Apoyo de cocina",
    "Other": "Otra",
    "consent": "Consentimiento",
    "Questions updated.": "Preguntas actualizadas.",
    "The application questions have changed. Open a new application in another tab and keep this page for reference.": "Las preguntas de la solicitud han cambiado. Abre una solicitud nueva en otra pestaña y conserva esta página como referencia.",
    "Open a new application": "Abrir nueva solicitud"
  },
  "zh": {
    "Personal information": "个人信息",
    "Work preferences": "工作偏好",
    "Certifications": "资格证书",
    "Skills quiz": "技能测验",
    "References": "推荐人",
    "Cover letter": "求职信",
    "Review": "核对",
    "Check the following before continuing:": "请检查以下内容后再继续：",
    "{label}: complete this field.": "{label}：请填写此项。",
    "{label}: enter a valid email address.": "{label}：请输入有效的电子邮箱地址。",
    "{label}: enter a valid phone number.": "{label}：请输入有效的电话号码。",
    "Date of birth: enter a valid date in the past.": "出生日期：请输入有效的出生日期，不能晚于今天。",
    "Choose a {types} file.": "请选择 {types} 文件。",
    "This file is empty. Choose a different file.": "此文件为空，请选择其他文件。",
    "Choose a file smaller than 10 MB.": "请选择小于 10 MB 的文件。",
    "Your files total more than 18 MB. Choose smaller files before continuing.": "文件总大小超过 18 MB。请缩小文件后再继续。",
    "Reference: {id}": "凭证编号：{id}",
    "Contact ": "请联系 ",
    " with this reference before submitting again.": "，并提供此凭证编号，确认后再重新提交。",
    "You’re offline.": "当前没有网络连接。",
    "Reconnect, then send this form. Your entries are still on this page.": "请恢复网络连接后再提交。已填写的内容仍保留在此页面。",
    "Sending…": "正在提交…",
    "Application received for review.": "已收到申请，待进一步核对。",
    "Application received.": "已收到申请。",
    "Inquiry received.": "已收到咨询。",
    "KEWW received your application by email, but your worker profile needs a manual check. You do not need to submit again.": "KEWW 已通过电子邮件收到申请，但工作人员档案仍需人工核对。请勿重复提交。",
    "Thank you. KEWW has received your details. Keep your reference for any follow-up.": "谢谢，KEWW 已收到你的信息。请保留凭证编号，以便后续联系。",
    "Not sent.": "尚未提交。",
    "Check the form and try again. Your entries are still on this page.": "请检查表单后重试。已填写的内容仍保留在此页面。",
    "Check this field and try again.": "请检查此项后重试。",
    "Submissions are not open on this preview. Use the current KEWW form.": "此预览网站尚未开放提交，请使用 KEWW 当前的正式表单。",
    "The service is temporarily unavailable. Your details remain on this page; please try again later.": "服务暂时无法使用。信息仍保留在此页面，请稍后重试。",
    "Too many requests. Please try again later.": "请求次数过多，请稍后重试。",
    "We need to check your submission.": "需要核对本次提交。",
    "Please do not submit again yet. KEWW could not confirm every part of this request.": "请暂时不要重复提交。KEWW 尚无法确认本次提交的所有步骤均已完成。",
    "We couldn’t confirm receipt.": "暂时无法确认是否已收到。",
    "The connection ended before we could confirm the result. Keep this page open and do not submit a second form yet.": "网络连接在确认结果前中断。请保持此页面打开，暂时不要再次提交。",
    "See receipt below": "查看下方凭证",
    "Step {number}: {name}": "第 {number} 步：{name}",
    "Reference {number}": "推荐人 {number}",
    "Full name": "姓名",
    "Company": "公司",
    "Email": "电子邮箱",
    "Phone": "电话",
    "How do they know you?": "与你的关系",
    "Loading positions…": "正在加载岗位…",
    "There are no application positions available right now. You can try again later or contact KEWW.": "目前没有可申请的岗位。请稍后再试，或联系 KEWW。",
    "Select the positions you’re interested in. Availability depends on current opportunities.": "请选择感兴趣的岗位。实际工作机会以当前安排为准。",
    "Positions couldn’t be loaded. Try again before continuing; your other entries are still here.": "岗位加载失败。请重试后再继续，其他已填写的信息仍在此页面。",
    "Loading questions…": "正在加载题目…",
    "Choose all that apply.": "请选择所有符合条件的答案。",
    "{count} questions. Your answers stay selected when you go back to another step.": "共 {count} 道题。返回其他步骤时，已选答案会保留。",
    "Questions couldn’t be loaded. Try again before continuing.": "题目加载失败，请重试后再继续。",
    "Choose at least one available position. If positions haven’t loaded, select Try again.": "请至少选择一个可申请岗位。如果岗位尚未加载，请点击“重试”。",
    "Load the quiz questions before continuing.": "请先加载测验题目，再继续。",
    "Question {number}: choose an answer.": "第 {number} 题：请选择答案。",
    "Not provided": "未填写",
    "Name": "姓名",
    "Date of birth": "出生日期",
    "Address": "地址",
    "Positions": "岗位",
    "Availability": "可工作日期",
    "Preferred time": "偏好时段",
    "Heard about KEWW": "了解 KEWW 的渠道",
    "Certifications and résumé": "证书与简历",
    "Food handler’s card": "食品从业资格证明",
    "Not attached": "未上传",
    "Résumé": "简历",
    "Other certifications": "其他证书",
    "None selected": "未选择",
    "Questions": "题目",
    "{answered} of {total} answered": "已回答 {answered} 题，共 {total} 题",
    "Professional references": "工作推荐人",
    "Text": "正文",
    "File": "文件",
    "Edit {section}": "编辑{section}",
    "Edit": "编辑",
    "Event Server": "活动服务员",
    "Server": "服务员",
    "Event Bartender": "活动调酒师",
    "Bartender": "调酒师",
    "Event Help": "活动协助人员",
    "Back of House": "后厨人员",
    "BOH": "后厨人员",
    "Other": "其他",
    "consent": "同意声明",
    "Questions updated.": "题目已更新。",
    "The application questions have changed. Open a new application in another tab and keep this page for reference.": "申请题目已更新。请在新标签页中打开新的申请，并保留此页面以供参考。",
    "Open a new application": "打开新的申请"
  }
};

export function formText(key, values = {}, language = 'en') {
  const locale = String(language).toLowerCase().split('-')[0];
  const message = formMessages[locale]?.[key] || key;
  return message.replace(/\{(\w+)\}/g, (match, name) => values[name] === undefined ? match : String(values[name]));
}
function formLanguage() { return typeof document === 'undefined' ? 'en' : document.documentElement.lang; }
function t(key, values = {}) { return formText(key, values, formLanguage()); }
function positionLabel(position) { return formLanguage().startsWith('en') ? position.PositionName : t(quizRole(position) || position.PositionName); }
function serverMessage(body, status) {
  if (formLanguage().startsWith('en')) return body.message || t('Check the form and try again. Your entries are still on this page.');
  if (body.code === 'not_configured') return t('Submissions are not open on this preview. Use the current KEWW form.');
  if (status === 429) return t('Too many requests. Please try again later.');
  if (body.code === 'temporarily_unavailable') return t('The service is temporarily unavailable. Your details remain on this page; please try again later.');
  return t('Check the form and try again. Your entries are still on this page.');
}

export function quizRole(position) {
  const name = String(position.QuizRole || position.PositionName || position.positionName || position.Name || '').trim().toLowerCase();
  return ({ 'event server': 'Event Server', server: 'Event Server', 'event bartender': 'Event Bartender', bartender: 'Event Bartender', 'event help': 'Event Help', 'back of house': 'Back of House', boh: 'Back of House' })[name] || null;
}

export function normalizePositions(data) {
  const list = Array.isArray(data) ? data : data?.positions;
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter(position => {
    const id = position?.PositionId ?? position?.positionId;
    if (!position || !['string', 'number'].includes(typeof id) || !String(id).trim() || !quizRole(position) || seen.has(String(id))) return false;
    seen.add(String(id));
    return true;
  }).map(position => ({ ...position, PositionId: position.PositionId ?? position.positionId, PositionName: position.PositionName || position.positionName || position.Name }));
}

export function chooseQuiz(banks, selectedRoles, random = Math.random) {
  const shuffle = source => {
    const list = source.slice();
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };
  const roles = [...new Set(selectedRoles)];
  const pools = shuffle(roles).map(role => shuffle((banks[role] || []).filter(question => ['single', 'multi'].includes(question.type) && Array.isArray(question.options) && question.options.length)));
  const selected = [];
  const seen = new Set();
  const limit = roles.length > 1 ? 15 : 10;
  while (selected.length < limit && pools.some(pool => pool.length)) {
    for (const pool of pools) {
      if (selected.length >= limit) break;
      while (pool.length) {
        const question = pool.shift();
        const key = question.question.toLowerCase().replace(/\s+/g, ' ').trim();
        if (seen.has(key)) continue;
        seen.add(key);
        selected.push(question);
        break;
      }
    }
  }
  return selected;
}

export function validateFiles(files, language = 'en') {
  const errors = {};
  let total = 0;
  for (const [field, file] of Object.entries(files)) {
    if (!file?.name || !fileRules[field]) continue;
    total += file.size;
    const extension = file.name.split('.').pop().toLowerCase();
    if (!fileRules[field].includes(extension)) errors[field] = formText('Choose a {types} file.', { types: fileRules[field].join(', ').toUpperCase() }, language);
    else if (!file.size) errors[field] = formText('This file is empty. Choose a different file.', {}, language);
    else if (file.size > 10 * 1024 * 1024) errors[field] = formText('Choose a file smaller than 10 MB.', {}, language);
  }
  if (total > 18 * 1024 * 1024) errors._files = formText('Your files total more than 18 MB. Choose smaller files before continuing.', {}, language);
  return errors;
}

export function allowedAttribution(search) {
  const query = new URLSearchParams(search);
  const result = {};
  for (const name of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const value = query.get(name);
    if (value && /^[a-zA-Z0-9_.-]{1,100}$/.test(value)) result[name] = value;
  }
  return result;
}

function element(tag, attributes = {}, text) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  if (text !== undefined) node.textContent = text;
  return node;
}

function addRequiredMarker(label) {
  if (label && !label.querySelector(':scope > .required-marker')) {
    const marker = element('span', { class: 'required-marker', 'aria-hidden': 'true' }, '*');
    label.insertBefore(marker, label.querySelector(':scope > .required-note'));
  }
}

function markRequiredFields(form) {
  for (const control of form.querySelectorAll('[required]')) {
    const label = control.labels?.[0];
    addRequiredMarker(label?.classList.contains('choice') ? label.querySelector(':scope > span') : label);
  }
  addRequiredMarker(form.querySelector('.position-fieldset > legend'));
}

function initializeForm(form, prefix, endpoint) {
  markRequiredFields(form);
  const result = document.getElementById(`${prefix}-result`);
  const errorBox = document.getElementById(`${prefix}-errors`);
  const submit = document.getElementById(`${prefix}-submit`);
  const originalLabel = submit.textContent;
  let dirty = false;
  let busy = false;
  let locked = false;
  let key = null;
  let revealServerErrors = () => {};
  const guard = event => {
    if (!dirty && !busy) return;
    event.preventDefault();
    event.returnValue = '';
  };
  window.addEventListener('beforeunload', guard);
  form.addEventListener('input', event => { dirty = true; if (!locked && !busy) key = null; clearFieldError(event.target); });
  form.addEventListener('change', event => { dirty = true; if (!locked && !busy) key = null; clearFieldError(event.target); });

  function clearFieldError(control) {
    if (!control.name) return;
    const field = CSS.escape(control.name);
    errorBox.querySelector(`[data-error-field="${field}"]`)?.remove();
    form.querySelector(`#${CSS.escape(control.id)}-error`)?.remove();
    control.removeAttribute('aria-invalid');
    const ids = (control.getAttribute('aria-describedby') || '').split(' ').filter(id => id && !id.endsWith('-error'));
    if (ids.length) control.setAttribute('aria-describedby', ids.join(' '));
    else control.removeAttribute('aria-describedby');
    if (!errorBox.querySelector('li')) errorBox.hidden = true;
  }

  function clearErrors() {
    errorBox.replaceChildren();
    errorBox.hidden = true;
    form.querySelectorAll('.field-error').forEach(node => node.remove());
    form.querySelectorAll('[aria-invalid]').forEach(control => {
      control.removeAttribute('aria-invalid');
      const ids = (control.getAttribute('aria-describedby') || '').split(' ').filter(id => id && !id.endsWith('-error'));
      if (ids.length) control.setAttribute('aria-describedby', ids.join(' '));
      else control.removeAttribute('aria-describedby');
    });
  }

  function showErrors(errors) {
    clearErrors();
    errorBox.append(element('p', {}, t('Check the following before continuing:')));
    const list = element('ul');
    for (const [name, message] of Object.entries(errors)) {
      const control = form.querySelector(`[name="${CSS.escape(name)}"]`);
      const item = element('li', { 'data-error-field': name });
      if (control) {
        if (!control.id) control.id = `${prefix}-${name}`;
        control.setAttribute('aria-invalid', 'true');
        const errorId = `${control.id}-error`;
        const inline = element('p', { id: errorId, class: 'field-error' }, message);
        const group = control.closest('.field') || control.closest('label') || control.parentElement;
        if (group.matches('label.choice')) group.after(inline);
        else group.append(inline);
        control.setAttribute('aria-describedby', `${control.getAttribute('aria-describedby') || ''} ${errorId}`.trim());
        const link = element('a', { href: `#${control.id}` }, message);
        link.addEventListener('click', event => { event.preventDefault(); control.focus(); });
        item.append(link);
      } else item.textContent = message;
      list.append(item);
    }
    errorBox.append(list);
    errorBox.hidden = false;
    errorBox.focus();
  }

  function validate(scope) {
    const errors = {};
    scope.querySelectorAll('input,textarea,select').forEach(control => {
      if (control.type === 'hidden' || control.disabled || !control.name) return;
      const label = form.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.childNodes[0]?.textContent?.trim() || control.name;
      if (control.required && (control.type === 'checkbox' ? !control.checked : control.type === 'file' ? !control.files.length : !control.value.trim())) errors[control.name] = t('{label}: complete this field.', { label: t(label) });
      else if (control.type === 'email' && control.value && !control.validity.valid) errors[control.name] = t('{label}: enter a valid email address.', { label: t(label) });
      else if (control.type === 'tel' && control.value && (control.value.replace(/\D/g, '').length < 7 || control.value.replace(/\D/g, '').length > 15 || !/^[+\d\s().-]+$/.test(control.value))) errors[control.name] = t('{label}: enter a valid phone number.', { label: t(label) });
      else if (control.name === 'birthday' && control.value && (control.value > new Date().toISOString().slice(0, 10) || control.value < '1900-01-01' || !/^\d{4}-\d{2}-\d{2}$/.test(control.value))) errors[control.name] = t('Date of birth: enter a valid date in the past.');
    });
    const files = Object.fromEntries([...form.querySelectorAll('input[type=file]')].map(control => [control.name, control.files[0]]));
    const fileErrors = validateFiles(files, formLanguage());
    for (const [name, message] of Object.entries(fileErrors)) {
      if (scope.querySelector(name === '_files' ? 'input[type=file]' : `[name="${CSS.escape(name)}"]`)) errors[name] = message;
    }
    return errors;
  }

  function status(title, message, isError = false, receiptId) {
    result.replaceChildren(element('h2', {}, t(title)), element('p', {}, message));
    if (receiptId) result.append(element('p', {}, t('Reference: {id}', { id: receiptId })));
    if (isError && receiptId) {
      const paragraph = element('p');
      paragraph.append(t('Contact '), element('a', { href: 'mailto:admin@workwithkeww.com' }, 'KEWW'), t(' with this reference before submitting again.'));
      result.append(paragraph);
    }
    result.classList.toggle('is-error', isError);
    result.hidden = false;
    result.focus();
  }

  async function send(data) {
    if (busy || locked) return;
    clearErrors();
    if (navigator.onLine === false) { status(t('You’re offline.'), t('Reconnect, then send this form. Your entries are still on this page.'), true); return; }
    key ||= crypto.randomUUID();
    busy = true;
    submit.disabled = true;
    submit.textContent = t('Sending…');
    form.setAttribute('aria-busy', 'true');
    const controls = [...form.querySelectorAll('input,textarea,select,button')];
    controls.forEach(control => { control.disabled = true; });
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 70000);
    try {
      const response = new Response(JSON.stringify({success:false,code:'not_configured',retrySafe:true,message:'Submissions are not open on this preview. Use the current KEWW form.'}), {status:503,headers:{'Content-Type':'application/json'}});
      const body = await response.json();
      if (body.success === true && body.emailSent === true && response.ok) {
        locked = true;
        dirty = false;
        const partial = body.status === 'partial' || body.apiSaved === false;
        status(partial ? t('Application received for review.') : prefix === 'application' ? t('Application received.') : t('Inquiry received.'), partial ? t('KEWW received your application by email, but your worker profile needs a manual check. You do not need to submit again.') : t('Thank you. KEWW has received your details. Keep your reference for any follow-up.'), false, body.receiptId);
      } else if (body.retrySafe === true) {
        controls.forEach(control => { control.disabled = false; });
        if (body.errors && Object.keys(body.errors).length) { const errors = Object.fromEntries(Object.entries(body.errors).map(([name, message]) => [name, formLanguage().startsWith('en') ? message : t('Check this field and try again.')])); revealServerErrors(errors); showErrors(errors); }
        if (body.code === 'quiz_changed') {
          status(t('Questions updated.'), t('The application questions have changed. Open a new application in another tab and keep this page for reference.'), true);
          result.append(element('a', { href: location.pathname, target: '_blank', rel: 'noopener', class: 'text-link' }, t('Open a new application')));
        } else status(t('Not sent.'), serverMessage(body, response.status), true);
      } else {
        locked = true;
        status(t('We need to check your submission.'), t('Please do not submit again yet. KEWW could not confirm every part of this request.'), true, body.receiptId || key);
      }
    } catch {
      locked = true;
      status(t('We couldn’t confirm receipt.'), t('The connection ended before we could confirm the result. Keep this page open and do not submit a second form yet.'), true, key);
    } finally {
      clearTimeout(timeout);
      busy = false;
      form.removeAttribute('aria-busy');
      submit.textContent = locked ? t('See receipt below') : originalLabel;
      if (!locked) controls.forEach(control => { control.disabled = false; });
    }
  }

  function formData() {
    const data = new FormData(form);
    data.set('pageUrl', `${location.origin}${location.pathname}`);
    const quizVersion = document.querySelector('meta[name="quiz-version"]')?.content;
    if (prefix === 'application' && quizVersion) data.set('quizVersion', quizVersion);
    for (const [name, value] of Object.entries(allowedAttribution(location.search))) data.set(name, value);
    return data;
  }
  return { clearErrors, showErrors, validate, send, formData, isLocked: () => busy || locked, setErrorNavigator: callback => { revealServerErrors = callback; } };
}

function initializeInquiry(form) {
  const api = initializeForm(form, 'inquiry', '/api/request-demo');
  if (new URLSearchParams(location.search).get('request') === 'free-trial') form.elements.requestType.value = 'Free Trial Request';
  if (new URLSearchParams(location.search).get('request') === 'demo') form.elements.requestType.value = 'Demo Request';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const errors = api.validate(form);
    if (Object.keys(errors).length) api.showErrors(errors);
    else api.send(api.formData());
  });
  form.hidden = false;
}

function initializeApplication(form) {
  const api = initializeForm(form, 'application', '/api/apply');
  const steps = [...form.querySelectorAll('.form-step')];
  const nav = document.getElementById('application-steps');
  const back = document.getElementById('application-back');
  const next = document.getElementById('application-next');
  const submit = document.getElementById('application-submit');
  const positionList = document.getElementById('positions-list');
  const positionStatus = document.getElementById('positions-status');
  const positionRetry = document.getElementById('positions-retry');
  const quizStatus = document.getElementById('quiz-status');
  const quizRetry = document.getElementById('quiz-retry');
  const quizContainer = document.getElementById('quiz-questions');
  let current = 0;
  let furthest = 0;
  let positions = [];
  let quiz = [];
  let banks = null;
  let roleSignature = '';
  let loadingPositions = false;
  let loadingQuiz = false;

  stepNames.forEach((name, index) => {
    const item = element('li');
    const button = element('button', { type: 'button', 'aria-label': t('Step {number}: {name}', { number: index + 1, name: t(name) }) });
    button.append(element('span', { class: 'step-name' }, t(name)));
    button.addEventListener('click', () => { if (!api.isLocked() && index <= furthest) showStep(index); });
    item.append(button);
    nav.append(item);
  });
  for (let number = 1; number <= 3; number++) {
    const group = element('fieldset', { class: 'reference-fields' });
    group.append(element('legend', {}, t('Reference {number}', { number })));
    const grid = element('div', { class: 'field-grid' });
    for (const [key, label, type] of [['Name', 'Full name', 'text'], ['Company', 'Company', 'text'], ['Email', 'Email', 'email'], ['Phone', 'Phone', 'tel'], ['Relationship', 'How do they know you?', 'text']]) {
      const name = `reference${number}${key}`;
      const field = element('div', { class: key === 'Relationship' ? 'field field-wide' : 'field' });
      field.append(element('label', { for: `apply-${name}` }, t(label)), element('input', { id: `apply-${name}`, name, type, required: '', maxlength: key === 'Email' ? '254' : key === 'Phone' ? '40' : key === 'Name' ? '100' : '200', autocomplete: 'off' }));
      grid.append(field);
    }
    group.append(grid);
    document.getElementById('references-fields').append(group);
  }

  markRequiredFields(form);

  function selectedPositions() {
    return [...positionList.querySelectorAll('input:checked')].map(control => positions[Number(control.dataset.positionIndex)]).filter(Boolean);
  }
  async function loadPositions() {
    if (loadingPositions) return;
    loadingPositions = true;
    positionList.replaceChildren();
    positions = [];
    positionStatus.textContent = t('Loading positions…');
    positionRetry.hidden = true;
    try {
      const response = await fetch('/keww-ui-review/assets/preview-positions.json', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('unavailable');
      positions = normalizePositions(await response.json());
      if (!positions.length) {
        positionStatus.textContent = t('There are no application positions available right now. You can try again later or contact KEWW.');
        positionRetry.hidden = false;
      } else {
        positionStatus.textContent = t('Select the positions you’re interested in. Availability depends on current opportunities.');
        positions.forEach((position, index) => {
          const choice = element('label', { class: 'choice' });
          choice.append(element('input', { type: 'checkbox', name: 'positions', value: String(position.PositionId), 'data-position-index': String(index), id: `apply-position-${index}` }), element('span', {}, positionLabel(position)));
          positionList.append(choice);
        });
      }
    } catch {
      positionStatus.textContent = t('Positions couldn’t be loaded. Try again before continuing; your other entries are still here.');
      positionRetry.hidden = false;
    } finally { loadingPositions = false; }
  }
  positionRetry.addEventListener('click', loadPositions);

  function selectedQuizRoles() { return [...new Set(selectedPositions().map(quizRole))]; }
  function selectedQuizSignature() { return selectedQuizRoles().slice().sort().join('|'); }

  async function buildQuiz() {
    const signature = selectedQuizSignature();
    if (signature === roleSignature && quiz.length) return;
    if (loadingQuiz) return;
    loadingQuiz = true;
    quizStatus.textContent = t('Loading questions…');
    quizRetry.hidden = true;
    quizContainer.replaceChildren();
    quiz = [];
    try {
      if (!banks) {
        const quizUrl = document.querySelector('meta[name="quiz-url"]')?.content || '/assets/quiz.json';
        const response = await fetch(quizUrl, { signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('unavailable');
        banks = (await response.json()).banks;
      }
      // The selection can change while the shared question bank is loading.
      const roles = selectedQuizRoles();
      const latestSignature = selectedQuizSignature();
      const questions = chooseQuiz(banks, roles);
      if (questions.length !== (roles.length > 1 ? 15 : 10)) throw new Error('missing questions');
      quiz = questions;
      roleSignature = latestSignature;
      quiz.forEach((question, index) => {
        const group = element('fieldset', { class: 'quiz-question field', 'data-question-id': question.id, lang: 'en' });
        group.append(element('legend', {}, `${index + 1}. ${question.question}`));
        addRequiredMarker(group.firstElementChild);
        if (question.type === 'multi') group.append(element('p', { class: 'field-guidance', lang: formLanguage() }, t('Choose all that apply.')));
        const list = element('div', { class: 'choice-list' });
        question.options.forEach((option, optionIndex) => {
          const label = element('label', { class: 'choice' });
          label.append(element('input', { type: question.type === 'multi' ? 'checkbox' : 'radio', name: `quiz-${question.id}`, value: String(optionIndex), id: `quiz-${question.id}-${optionIndex}` }), element('span', {}, option));
          list.append(label);
        });
        group.append(list);
        quizContainer.append(group);
      });
      quizStatus.textContent = t('{count} questions. Your answers stay selected when you go back to another step.', { count: quiz.length });
    } catch {
      quizStatus.textContent = t('Questions couldn’t be loaded. Try again before continuing.');
      quizRetry.hidden = false;
    } finally { loadingQuiz = false; }
  }
  quizRetry.addEventListener('click', buildQuiz);
  positionList.addEventListener('change', () => {
    roleSignature = '';
    quiz = [];
    quizContainer.replaceChildren();
    furthest = Math.min(furthest, 3);
    nav.querySelectorAll('button').forEach((button, index) => { button.disabled = index > furthest; });
  });

  function quizAnswers() {
    return quiz.map(question => ({ id: question.id, answer: [...quizContainer.querySelectorAll(`input[name="quiz-${CSS.escape(question.id)}"]:checked`)].map(control => Number(control.value)) }));
  }
  function validateStep(index) {
    const errors = api.validate(steps[index]);
    if (index === 1 && !selectedPositions().length) errors.positions = t('Choose at least one available position. If positions haven’t loaded, select Try again.');
    if (index === 3) {
      if (loadingQuiz || !quiz.length || roleSignature !== selectedQuizSignature()) errors._quiz = t('Load the quiz questions before continuing.');
      else quizAnswers().forEach((answer, questionIndex) => { if (!answer.answer.length) errors[`quiz-${answer.id}`] = t('Question {number}: choose an answer.', { number: questionIndex + 1 }); });
    }
    return errors;
  }

  function review() {
    const host = document.getElementById('application-review');
    host.replaceChildren();
    const value = name => { const control = form.elements.namedItem(name); return (control?.tagName === 'SELECT' && control.value ? control.selectedOptions[0]?.textContent : control?.value) || t('Not provided'); };
    const sections = [
      ['Personal information', 0, [['Name', `${value('firstName')} ${value('lastName')}`], ['Email', value('email')], ['Phone', value('phone')], ['Date of birth', value('birthday')], ['Address', value('address')]]],
      ['Work preferences', 1, [['Positions', selectedPositions().map(position => positionLabel(position)).join(', ')], ['Availability', value('availability')], ['Preferred time', value('preferredTiming')], ['Heard about KEWW', value('referral')]]],
      ['Certifications and résumé', 2, [['Food handler’s card', form.elements.foodHandler.files[0]?.name || t('Not attached')], ['TABC', form.elements.tabc.files[0]?.name || t('Not attached')], ['Résumé', form.elements.resume.files[0]?.name || t('Not attached')], ['Other certifications', [...form.querySelectorAll('[name=certs]:checked')].map(control => t(control.value)).join(', ') || t('None selected')]]],
      ['Skills quiz', 3, [['Questions', t('{answered} of {total} answered', { answered: quizAnswers().filter(answer => answer.answer.length).length, total: quiz.length })]]],
      ['Professional references', 4, [1, 2, 3].map(number => [t('Reference {number}', { number }), ['Name', 'Company', 'Email', 'Phone', 'Relationship'].map(key => value(`reference${number}${key}`)).join('\n')])],
      ['Cover letter', 5, [['Text', value('coverLetter')], ['File', form.elements.coverLetterFile.files[0]?.name || t('Not attached')]]]
    ];
    for (const [title, index, rows] of sections) {
      const section = element('section', { class: 'review-section' });
      const heading = element('div', { class: 'review-heading' });
      const edit = element('button', { type: 'button', class: 'quiet-button', 'aria-label': t('Edit {section}', { section: t(title).toLowerCase() }) }, t('Edit'));
      edit.addEventListener('click', () => { if (!api.isLocked()) showStep(index); });
      heading.append(element('h2', {}, t(title)), edit);
      const list = element('dl');
      rows.forEach(([label, content]) => list.append(element('dt', {}, t(label)), element('dd', {}, content)));
      section.append(heading, list);
      host.append(section);
    }
  }

  function showStep(index, focus = true) {
    current = index;
    furthest = Math.max(furthest, index);
    api.clearErrors();
    steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
    [...nav.querySelectorAll('button')].forEach((button, stepIndex) => {
      button.disabled = stepIndex > furthest;
      if (stepIndex === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    back.hidden = index === 0;
    next.hidden = index === 6;
    submit.hidden = index !== 6;
    if (index === 3) buildQuiz();
    if (index === 6) review();
    if (focus) {
      const legend = steps[index].querySelector('legend');
      legend.tabIndex = -1;
      legend.focus();
      legend.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  api.setErrorNavigator(errors => {
    if (errors.positionsJson) { errors.positions = errors.positionsJson; delete errors.positionsJson; showStep(1, false); return; }
    if (errors.quizAnswers) { errors._quiz = errors.quizAnswers; delete errors.quizAnswers; showStep(3, false); return; }
    const first = Object.keys(errors).map(name => form.querySelector(`[name="${CSS.escape(name)}"]`)).find(Boolean);
    const index = steps.indexOf(first?.closest('.form-step'));
    if (index >= 0) showStep(index, false);
  });
  next.addEventListener('click', () => {
    if (api.isLocked()) return;
    const errors = validateStep(current);
    if (Object.keys(errors).length) api.showErrors(errors);
    else showStep(current + 1);
  });
  back.addEventListener('click', () => { if (!api.isLocked()) showStep(current - 1); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (current !== 6) { next.click(); return; }
    for (let index = 0; index < steps.length; index++) {
      const errors = validateStep(index);
      if (Object.keys(errors).length) { showStep(index, false); api.showErrors(errors); return; }
    }
    const data = api.formData();
    [...data.keys()].filter(name => name.startsWith('quiz-') || name === 'positions').forEach(name => data.delete(name));
    data.set('positionsJson', JSON.stringify(selectedPositions()));
    data.set('quizAnswers', JSON.stringify(quizAnswers()));
    api.send(data);
  });
  document.querySelector('[data-form-ui]').hidden = false;
  showStep(0, false);
  loadPositions();
}

if (typeof document !== 'undefined') {
  const application = document.getElementById('application-form');
  const inquiry = document.getElementById('inquiry-form');
  if (application) initializeApplication(application);
  if (inquiry) initializeInquiry(inquiry);
}
