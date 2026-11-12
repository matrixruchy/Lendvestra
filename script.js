/* LENDVESTRA site helpers and index page interactions. */
(() => {
  'use strict';

  const menu = document.querySelector('#menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const contact = document.querySelector('#contactForm');
  if (contact) {
    contact.addEventListener('submit', (event) => {
      event.preventDefault();
      const feedback = document.querySelector('#feedback');
      if (feedback) {
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        feedback.textContent = 'Demo only: this form is not connected to a backend, so your message has not been sent.';
      }
    });
  }
})();

(() => {
  const page = document.body.dataset.page;
  if (page === "index") {
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);let activeForm='';
const fields={loan:[['Full name','text','full','e.g. Your full name',true],['Email address','email','','name@example.com',true],['Phone number','tel','','+234...',true],['Monthly income range','select','','',true,['Select a range','Below ₦50,000','₦50,000–₦100,000','₦100,000–₦250,000','₦250,000+']],['Employment / business','text','','Your work or business',true],['Requested loan amount (₦)','number','','e.g. 250000',true],['Preferred repayment period','select','','',true,['Choose period','1 month','3 months','6 months','12 months','Other']],['Loan purpose','textarea','full','What would the loan be used for?',true]],invest:[['Full name','text','full','e.g. Your full name',true],['Email address','email','','name@example.com',true],['Phone number','tel','','+234...',false],['Preferred contact method','select','','',true,['Choose method','Email','Phone','WhatsApp']],['Investment interest range','select','full','',false,['Optional','Prefer not to say','Under ₦100,000','₦100,000–₦500,000','₦500,000–₦2,000,000','Above ₦2,000,000']],['What information would you like?','textarea','full','Ask for official company information or documentation',true]],funding:[['Full name','text','full','e.g. Your full name',true],['Email address','email','','name@example.com',true],['Preferred contact method','select','','',true,['Choose method','Email','Phone','WhatsApp']],['Area of interest','textarea','full','What would you like to understand about borrower-loan funding?',true]],signup:[['Full name','text','full','e.g. Your full name',true],['Email address','email','full','name@example.com',true],['Password','password','','At least 8 characters',true]],signin:[['Email address','email','full','name@example.com',true],['Password','password','full','Your password',true]],contact:[['Full name','text','','Your name',true],['Email address','email','','name@example.com',true],['Enquiry category','select','full','',true,['Choose category','Loan application','Investment enquiry','Account support','Complaint','Other']],['Message','textarea','full','How can we help?',true]]};
document.addEventListener('click',function(e){const trigger=e.target.closest('[data-modal="loan"],[data-modal="invest"],[data-modal="funding"]');if(!trigger)return;e.preventDefault();e.stopImmediatePropagation();const type=trigger.dataset.modal;window.location.href=type==='loan'?'loan-application.html':'investment-enquiry.html';},true);
function openModal(type){activeForm=type;const titles={loan:'Loan application enquiry',invest:'Investment information enquiry',funding:'Borrower-loan funding enquiry',signup:'Create your account',signin:'Welcome back',contact:'Contact support'};$('#modalTitle').textContent=titles[type]||'Enquiry';const liveForm=['loan','invest','funding','contact'].includes(type);$('#modalDesc').textContent=type==='signup'||type==='signin'?'Use the secure account panel to create an account or sign in.':liveForm?'Your enquiry will be saved securely to your LENDVESTRA account. Sign in with a verified email before submitting. Do not include passwords, bank details or card information.':'Please complete the form.';const box=$('#formFields');box.innerHTML='';(fields[type]||fields.contact).forEach((f,i)=>{const wrap=document.createElement('div');wrap.className='field '+(f[2]==='full'?'full':'');const label=document.createElement('label');label.textContent=f[0];label.htmlFor='f'+i;wrap.appendChild(label);let el;if(f[1]==='select'){el=document.createElement('select');(f[5]||[]).forEach((v,j)=>{const o=document.createElement('option');o.value=j===0?'':v;o.textContent=v;el.appendChild(o)});}else if(f[1]==='textarea'){el=document.createElement('textarea');el.placeholder=f[3];}else{el=document.createElement('input');el.type=f[1];el.placeholder=f[3];if(f[1]==='number'){el.min='1';el.step='0.01';}}el.id='f'+i;el.name='field'+i;if(f[4])el.required=true;wrap.appendChild(el);box.appendChild(wrap)});if(liveForm){const consent=document.createElement('label');consent.className='check field full';consent.innerHTML='<input type="checkbox" required> <span>I consent to LENDVESTRA storing this enquiry to respond to my request. I understand this is an enquiry only, not loan approval, an investment contract, or a promise of returns.</span>';box.appendChild(consent)}$('#modal').classList.add('open');setTimeout(()=>box.querySelector('input,select,textarea')?.focus(),30)}
function closeModal(){$('#modal').classList.remove('open')}$$('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal)));$('#closeModal').addEventListener('click',closeModal);$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});const requestedEnquiry=new URLSearchParams(window.location.search).get('enquiry');if(requestedEnquiry==='funding'||requestedEnquiry==='contact'){openModal(requestedEnquiry);window.history.replaceState(null,document.title,window.location.pathname+window.location.search+'#contact');}
$('#leadForm').addEventListener('submit',async e=>{e.preventDefault();if(!e.target.reportValidity())return;const type=activeForm;if(!['loan','invest','funding','contact'].includes(type)){closeModal();return;}const db=window.lendvestraSupabaseClient;if(!db){showToast('Secure connection is unavailable. Refresh and try again.');return;}const submit=e.target.querySelector('[type="submit"]');if(submit){submit.disabled=true;submit.dataset.oldText=submit.textContent;submit.textContent='Submitting…';}try{const {data:{user},error:authError}=await db.auth.getUser();if(authError||!user)throw new Error('Please sign in to your verified account before submitting an enquiry.');if(!user.email_confirmed_at)throw new Error('Please verify your email address before submitting an enquiry.');const value=i=>document.getElementById('f'+i)?.value?.trim()||'';let table,payload;if(type==='loan'){const amount=Number(value(5));if(!Number.isFinite(amount)||amount<=0)throw new Error('Enter a valid loan amount greater than zero.');table='loan_applications';payload={user_id:user.id,requested_amount:amount,currency:'NGN',purpose:value(7),monthly_income_range:value(3),employment_or_business:value(4),repayment_period:value(6),applicant_phone:value(2),reference_code:'LV-'+crypto.randomUUID().slice(0,8).toUpperCase()};}else{table=type==='contact'?'support_enquiries':'investment_enquiries';payload={user_id:user.id,full_name:value(0)||user.user_metadata?.full_name||'',email:user.email,phone:null,contact_method:type==='invest'?value(3):type==='funding'?value(2):null,interest_range:type==='invest'?value(4)||null:null,category:type==='contact'?value(2):type==='funding'?'Borrower-loan funding':'Investment information',message:type==='invest'?value(5):type==='funding'?value(3):type==='contact'?value(3):'',consent_recorded:true};}const {error}=await db.from(table).insert(payload);if(error)throw error;closeModal();e.target.reset();showToast(type==='loan'?'Your loan enquiry was submitted. Check your dashboard for its status.':'Your enquiry has been submitted securely.');}catch(err){showToast(err?.message||'Could not submit this enquiry. Please try again.');}finally{if(submit){submit.disabled=false;submit.textContent=submit.dataset.oldText||'Submit';}}});
function showToast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),5000)}
$('#themeToggle').addEventListener('click',()=>{const dark=$('#app').dataset.theme!=='dark';$('#app').dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';$('#themeToggle').textContent=dark?'☀':'☾';});$('#menuBtn').addEventListener('click',()=>{const m=$('#mobilelinks');m.style.display=m.style.display==='block'?'none':'block'});$$('#mobilelinks a').forEach(a=>a.addEventListener('click',()=>$('#mobilelinks').style.display='none'));
$$('[data-policy]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showToast(a.dataset.policy+' content must be reviewed and approved before launch.')}));

(()=>{const root=document.documentElement;const btn=document.getElementById('themeToggle');if(!btn)return;let saved=null;try{saved=localStorage.getItem('lendvestra-theme')}catch(e){}const initial=saved==='dark'||saved==='light'?saved:'light';function apply(theme){root.dataset.theme=theme;btn.textContent=theme==='dark'?'☀':'☾';btn.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');btn.title=theme==='dark'?'Switch to light mode':'Switch to dark mode';try{localStorage.setItem('lendvestra-theme',theme)}catch(e){}}apply(initial);btn.addEventListener('click',()=>apply(root.dataset.theme==='dark'?'light':'dark'));})();

(()=>{
 const SUPABASE_URL='https://cgzvqtrasdcjfylfuktf.supabase.co';
 const SUPABASE_PUBLISHABLE_KEY='sb_publishable_rxSTPCOTV-bRTQci_PO-jQ_M_iRC6fW';
 // The storage adapter lets the login checkbox choose persistent local storage or tab-session storage.
 const rememberChoice=()=>document.getElementById('rememberSession')?.checked===true;
 const rememberStorage={
  getItem(key){try{const sessionValue=sessionStorage.getItem(key);if(sessionValue!==null)return sessionValue;const localValue=localStorage.getItem(key);if(localValue!==null&&!rememberChoice()){sessionStorage.setItem(key,localValue);localStorage.removeItem(key);return localValue;}return localValue;}catch(_){return null;}},
  setItem(key,value){try{const target=rememberChoice()?localStorage:sessionStorage;const other=rememberChoice()?sessionStorage:localStorage;target.setItem(key,value);other.removeItem(key);}catch(_){/* Browser storage may be disabled; Supabase will surface auth errors if persistence fails. */}},
  removeItem(key){try{localStorage.removeItem(key);sessionStorage.removeItem(key);}catch(_){} }
 };
 const client=window.supabase?.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storage:rememberStorage}});window.lendvestraSupabaseClient=client;
 const getAuthRedirectUrl=(emailVerification=false)=>{if(!['http:','https:'].includes(window.location.protocol))throw new Error('Email verification requires a website URL. Open this site over HTTPS or through a local web server, not directly as a file.');const redirectUrl=new URL(window.location.pathname,window.location.origin);if(emailVerification)redirectUrl.searchParams.set('auth','email-verification');return redirectUrl.href;};
 let emailVerificationPending=new URLSearchParams(window.location.search).get('auth')==='email-verification',suppressSignupAuthRedirect=false,dashboardRedirectStarted=false;
 function redirectToUserDashboard(){if(dashboardRedirectStarted)return;dashboardRedirectStarted=true;window.location.assign('user.html');}
 const gate=document.getElementById('authGate'),site=document.getElementById('publicSite'),footer=document.querySelector('.footer');
 const form=document.getElementById('entryForm'),nameWrap=document.getElementById('entryName'),heading=document.getElementById('authHeading'),subtitle=document.getElementById('authSubtitle'),submit=document.getElementById('entrySubmit'),err=document.getElementById('authError');let mode='signup';
 function setMode(next){mode=next;const signup=mode==='signup';document.getElementById('rememberSessionWrap').hidden=signup;if(signup)document.getElementById('rememberSession').checked=false;nameWrap.hidden=!signup;document.getElementById('signupDetails').hidden=!signup;document.getElementById('entryConfirmWrap').hidden=!signup;document.getElementById('entryFullName').required=signup;['entryPhone','entryCountry','entryAddress','entryCity','entryRegion','entryEmployment','entryTerms','entryConfirmPassword'].forEach(id=>{const el=document.getElementById(id);if(el)el.required=signup});document.getElementById('entryPassword').autocomplete=signup?'new-password':'current-password';document.getElementById('entryPassword').minLength=8;document.getElementById('entryConfirmPassword').required=signup;heading.textContent=signup?'Create your account':'Welcome back';subtitle.textContent=signup?'Create your account to get started. Verify your email before accessing your dashboard.':'Sign in to continue to your LENDVESTRA dashboard.';submit.textContent=signup?'Create account':'Sign in';document.getElementById('tabSignin').classList.toggle('active',!signup);document.getElementById('tabSignup').classList.toggle('active',signup);document.getElementById('forgotPassword').hidden=signup;document.getElementById('resendConfirmation').hidden=signup;err.textContent='';restoreAuthErrorStyle()}
 document.querySelectorAll('[data-password-toggle]').forEach(toggle=>{toggle.addEventListener('click',()=>{const input=document.getElementById(toggle.dataset.passwordToggle);if(!input)return;const reveal=input.type==='password';input.type=reveal?'text':'password';toggle.setAttribute('aria-label',reveal?'Hide password':'Show password');toggle.setAttribute('title',reveal?'Hide password':'Show password');toggle.setAttribute('aria-pressed',String(reveal));toggle.innerHTML=reveal?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.1 3.9"/><path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4-.8"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';});});
 document.getElementById('tabSignin').addEventListener('click',()=>setMode('signin'));document.getElementById('tabSignup').addEventListener('click',()=>setMode('signup'));
 function showAuthError(message){err.textContent=message;}
 function showAuthSuccess(message){err.style.color='var(--green)';err.textContent=message;}
 function restoreAuthErrorStyle(){err.style.color='';}
(() => {
 const preloader = document.getElementById('sitePreloader');
 if (!preloader) return;
 let closing = false;
 const dismiss = () => {
  if (closing) return;
  closing = true;
  preloader.classList.add('is-leaving');
  window.setTimeout(() => preloader.remove(), 400);
 };
 if (document.readyState === 'complete') dismiss();
 else window.addEventListener('load', dismiss, { once: true });
 window.setTimeout(dismiss, 3000);
})();

 form.addEventListener('submit',async e=>{e.preventDefault();restoreAuthErrorStyle();showAuthError('');if(!form.reportValidity())return;if(!client){showAuthError('Supabase connection library did not load. Check your internet connection and refresh.');return;}const email=document.getElementById('entryEmail').value.trim();const password=document.getElementById('entryPassword').value;submit.disabled=true;submit.textContent=mode==='signup'?'Creating account…':'Signing in…';
  try{
   if(mode==='signup'){
    const fullName=document.getElementById('entryFullName').value.trim();
    const confirmPassword=document.getElementById('entryConfirmPassword').value;
    if(password!==confirmPassword)throw new Error('Your passwords do not match.');
    if(password.length<8)throw new Error('Use a password with at least 8 characters.');
    const profile={full_name:fullName,phone_number:document.getElementById('entryPhone').value.trim(),country:document.getElementById('entryCountry').value.trim(),address_line:document.getElementById('entryAddress').value.trim(),city:document.getElementById('entryCity').value.trim(),region:document.getElementById('entryRegion').value.trim(),postal_code:document.getElementById('entryPostal').value.trim(),employment_status:document.getElementById('entryEmployment').value};
    suppressSignupAuthRedirect=true;
    const {data,error}=await client.auth.signUp({email,password,options:{data:profile,emailRedirectTo:getAuthRedirectUrl(true)}});
    if(error)throw error;
    if(data.session){const {error:signOutError}=await client.auth.signOut({scope:'local'});if(signOutError)throw signOutError;}
    const isEmailConfirmed=Boolean(data.user?.email_confirmed_at);
    document.getElementById('entryEmail').value=email;
    setMode('signin');
    showAuthSuccess(isEmailConfirmed?'Account created. Please sign in to continue.':'Account created. Check your inbox and spam folder for the confirmation link. You must verify your email before signing in. If it does not arrive, use Resend confirmation email.');
   } else {
    const {data,error}=await client.auth.signInWithPassword({email,password});if(error)throw error;
    if(!data.user?.email_confirmed_at){await client.auth.signOut();throw new Error('Please verify your email address using the confirmation link before signing in.');}
    form.reset();redirectToUserDashboard();
   }
  }catch(error){showAuthError(error?.message||'Something went wrong. Please try again.');}
  finally{suppressSignupAuthRedirect=false;submit.disabled=false;submit.textContent=mode==='signup'?'Create account':'Sign in';}
 });
 document.getElementById('resendConfirmation').addEventListener('click',async()=>{restoreAuthErrorStyle();showAuthError('');const email=document.getElementById('entryEmail').value.trim();if(!email){showAuthError('Enter your email address first.');return;}if(!client){showAuthError('Supabase connection library did not load. Refresh and try again.');return;}const btn=document.getElementById('resendConfirmation');btn.disabled=true;try{const {error}=await client.auth.resend({type:'signup',email,options:{emailRedirectTo:getAuthRedirectUrl(true)}});if(error)throw error;showAuthSuccess('If the address can receive a confirmation, a new email has been requested. Check your inbox and spam folder.');}catch(error){showAuthError(error?.message||'Unable to resend the confirmation email right now.');}finally{btn.disabled=false;}});
 document.getElementById('forgotPassword').addEventListener('click',async()=>{restoreAuthErrorStyle();showAuthError('');const email=document.getElementById('entryEmail').value.trim();if(!email){showAuthError('Enter your email address first, then tap Forgot password again.');return;}if(!client){showAuthError('Connection library did not load. Refresh and try again.');return;}const btn=document.getElementById('forgotPassword');btn.disabled=true;try{const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:getAuthRedirectUrl()});if(error)throw error;showAuthSuccess('If an account exists for this email, a password-reset link will be sent. Check your inbox.');}catch(error){showAuthError(error.message||'Unable to request a password reset.');}finally{btn.disabled=false;}});
 // Public landing page is the default entry point. Authentication opens only when requested.
 gate.hidden=true;site.classList.remove('hidden');footer?.classList.remove('hidden');setMode('signup');if(emailVerificationPending||new URLSearchParams(window.location.search).get('auth')==='signin')openAuth('signin');
 function openAuth(nextMode){site.classList.add('hidden');footer?.classList.add('hidden');gate.hidden=false;setMode(nextMode);window.scrollTo(0,0);}
 document.addEventListener('click',function(e){const trigger=e.target.closest('[data-modal="signin"],[data-modal="signup"]');if(!trigger)return;e.preventDefault();e.stopImmediatePropagation();openAuth(trigger.dataset.modal==='signin'?'signin':'signup');},true);
 document.addEventListener('click',function(e){const back=e.target.closest('[data-auth-back]');if(!back)return;e.preventDefault();gate.hidden=true;site.classList.remove('hidden');footer?.classList.remove('hidden');window.scrollTo(0,0);},true);
 if(client){
  client.auth.onAuthStateChange((event,session)=>{
   if(emailVerificationPending||suppressSignupAuthRedirect)return;
   if(session?.user&&event==='SIGNED_IN'){
    if(session.user.email_confirmed_at){redirectToUserDashboard();}
    else showAuthError('Please verify your email address before accessing your dashboard.');
   }
  });
  client.auth.getSession().then(async ({data,error})=>{
   if(emailVerificationPending){
    let callbackSession=data?.session;
    try{
     if(error)throw error;
     const verifiedUser=data?.session?.user;
     if(callbackSession){const {error:signOutError}=await client.auth.signOut({scope:'local'});if(signOutError)throw signOutError;callbackSession=null;}
     if(!verifiedUser?.email_confirmed_at)throw new Error('The confirmation link may have expired or could not be verified. Request a new confirmation email and try again.');
     window.history.replaceState(null,document.title,window.location.pathname);
     emailVerificationPending=false;
     openAuth('signin');
     document.getElementById('entryEmail').value=verifiedUser.email||'';
     showAuthSuccess('Your email is verified. Please sign in to continue.');
    }catch(error){
     if(!callbackSession){window.history.replaceState(null,document.title,window.location.pathname);emailVerificationPending=false;}
     openAuth('signin');
     showAuthError(error?.message||'Email verification could not be completed. Request a new confirmation email and try again.');
    }
    return;
   }
   if(error){showAuthError('Unable to check your sign-in session. Please refresh and try again.');return;}
   if(data?.session){
    if(data.session.user?.email_confirmed_at&&!['funding','contact'].includes(new URLSearchParams(window.location.search).get('enquiry')))redirectToUserDashboard();
    else{await client.auth.signOut({scope:'local'});showAuthError('Please verify your email address before accessing your dashboard.');}
   }
  }).catch(error=>showAuthError(error?.message||'Unable to check your sign-in session. Please refresh and try again.'));
 }else{showAuthError('Supabase connection library did not load. Check your internet connection and refresh.');}
})();

} else if (page === "user") {
(()=>{'use strict';
const SUPABASE_URL='https://cgzvqtrasdcjfylfuktf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_rxSTPCOTV-bRTQci_POjQ-M_iRC6fW';
const authStorage={
 getItem(key){const sessionValue=sessionStorage.getItem(key);return sessionValue??localStorage.getItem(key);},
 setItem(key,value){if(sessionStorage.getItem(key)!==null&&localStorage.getItem(key)===null)sessionStorage.setItem(key,value);else localStorage.setItem(key,value);},
 removeItem(key){localStorage.removeItem(key);sessionStorage.removeItem(key);}
};
const client=window.supabase?.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storage:authStorage}});
window.lendvestraSupabaseClient=client;
const dashboard=document.getElementById('customerDashboard'),loader=document.getElementById('dashboardPreloader'),errorPanel=document.getElementById('dashboardError'),authMessage=document.getElementById('dashboardAuthMessage'),refreshMessage=document.getElementById('dashboardRefreshMessage');
const safe=value=>String(value??'—').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const date=value=>value?new Date(value).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'Not specified';
const money=(amount,currency='USD')=>{if(amount===null||amount===undefined||amount==='')return 'Not specified';try{return new Intl.NumberFormat(undefined,{style:'currency',currency}).format(Number(amount));}catch{return String(amount);}};
const totalsByCurrency=(records,amountForRecord,defaultCurrency)=>records.reduce((totals,record)=>{const currency=record.currency||defaultCurrency;totals[currency]=(totals[currency]||0)+amountForRecord(record);return totals;},{});
const formatTotals=(totals,defaultCurrency)=>Object.entries(totals).sort(([left],[right])=>left.localeCompare(right)).map(([currency,total])=>money(total,currency)).join(' · ')||money(0,defaultCurrency);
let recordsRefreshing=false,recordsRefreshQueued=false;
function showAuthFailure(message){loader.hidden=true;dashboard.hidden=true;errorPanel.hidden=false;authMessage.textContent=message;}
function renderEmpty(id,title,description){const element=document.getElementById(id);if(element)element.innerHTML='<div class="record-empty"><div class="empty-icon" aria-hidden="true">◈</div><h3>'+safe(title)+'</h3><p>'+safe(description)+'</p></div>';}
function renderRecords(id,rows,render,title,description){const element=document.getElementById(id);if(!element)return;if(rows.error){console.warn(title+' could not be loaded.',rows.error.message);renderEmpty(id,'Records temporarily unavailable','We could not load these records. Please refresh later or contact support if the issue continues.');return;}if(rows.data?.length)element.innerHTML=rows.data.map(render).join('');else renderEmpty(id,title,description);}
async function loadCustomerRecords(userId){
 if(recordsRefreshing){recordsRefreshQueued=true;return;}
 recordsRefreshing=true;
 try{
 if(refreshMessage)refreshMessage.textContent='Refreshing your latest records…';
 const [loans,investments,enquiries]=await Promise.all([
  client.from('loan_applications').select('id,reference_code,requested_amount,currency,status,created_at,updated_at').eq('user_id',userId).order('created_at',{ascending:false}),
  client.from('investment_records').select('id,plan_name,principal_amount,currency,start_date,expected_earnings,maturity_date,status,created_at,updated_at').eq('user_id',userId).order('created_at',{ascending:false}),
  client.from('investment_enquiries').select('id,category,interest_range,contact_method,status,created_at').eq('user_id',userId).order('created_at',{ascending:false})
 ]);
 const loanRows=loans.data||[],investmentRows=investments.data||[];
 document.getElementById('loanCount').textContent=loans.error?'—':String(loanRows.length);
 document.getElementById('investmentCount').textContent=investments.error?'—':String(investmentRows.length);
 document.getElementById('loanBalanceValue').textContent=loans.error?'Unavailable':formatTotals(totalsByCurrency(loanRows,record=>Number(record.requested_amount)||0,'NGN'),'NGN');
 document.getElementById('investmentBalanceValue').textContent=investments.error?'Unavailable':formatTotals(totalsByCurrency(investmentRows,record=>(Number(record.principal_amount)||0)+(Number(record.expected_earnings)||0),'USD'),'USD');
 const pill=status=>'<span class="pill">'+safe(status||'Received')+'</span>';
 renderRecords('loanRecords',loans,record=>'<article class="record-card"><h3>Loan application</h3><p><strong>Reference:</strong> '+safe(record.reference_code||String(record.id).slice(0,8).toUpperCase())+'</p><p><strong>Requested amount:</strong> '+safe(money(record.requested_amount,record.currency||'NGN'))+'</p><p><strong>Submitted:</strong> '+safe(date(record.created_at))+'</p><p><strong>Current status:</strong> '+pill(record.status==='Submitted'?'Pending':record.status||'Pending')+'</p><p><strong>Last updated:</strong> '+safe(date(record.updated_at||record.created_at))+'</p></article>','Loan records','Your submitted applications will appear here once recorded.');
 renderRecords('investmentRecords',investments,record=>'<article class="record-card"><h3>'+safe(record.plan_name||'Investment plan')+'</h3><p><strong>Recorded amount:</strong> '+safe(money(record.principal_amount,record.currency||'USD'))+'</p><p><strong>Start date:</strong> '+safe(date(record.start_date))+'</p><p><strong>Expected earnings:</strong> '+safe(record.expected_earnings===null?'Not disclosed':money(record.expected_earnings,record.currency||'USD'))+'</p><p><strong>Maturity date:</strong> '+safe(date(record.maturity_date))+'</p><p><strong>Current status:</strong> '+pill(record.status||'Recorded')+'</p></article>','Investment records','Confirmed investment records will appear here when authorised staff record them.');
 renderRecords('investmentEnquiryRecords',enquiries,record=>'<article class="record-card"><h3>'+safe(record.category||'Investment enquiry')+'</h3><p><strong>Reference:</strong> '+safe(String(record.id).slice(0,8).toUpperCase())+'</p><p><strong>Interest range:</strong> '+safe(record.interest_range||'Not specified')+'</p><p><strong>Preferred contact:</strong> '+safe(record.contact_method||'Not specified')+'</p><p><strong>Submitted:</strong> '+safe(date(record.created_at))+'</p><p><strong>Current status:</strong> '+pill(record.status||'Received')+'</p></article>','Investment enquiries','Enquiries submitted from your account will appear here with their current status.');
 if(refreshMessage)refreshMessage.textContent=[loans,investments,enquiries].some(result=>result.error)?'Some records could not be loaded. Please try again; the affected sections are marked unavailable.':'Your records were refreshed '+new Date().toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'})+'.';
 }finally{
  recordsRefreshing=false;
  if(recordsRefreshQueued){recordsRefreshQueued=false;void loadCustomerRecords(userId).catch(error=>{if(refreshMessage)refreshMessage.textContent='Refresh failed: '+(error.message||'Please try again.');});}
 }
}
function setProfile(user){
 const put=(id,value)=>{const element=document.getElementById(id);if(element)element.textContent=value||'—';};
 const metadata=user.user_metadata||{};
 put('dashWelcome','Welcome, '+(metadata.full_name||user.email||'there')+'. Here is your personal account overview.');
 put('profileFullName',metadata.full_name||'Not provided at registration');
 put('profileEmail',user.email);
 put('profileCreatedAt',user.created_at?new Date(user.created_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—');
 put('profileEmailStatus',user.email_confirmed_at?'Verified':'Not verified');
 put('profileAccountRef',user.id?user.id.slice(0,8).toUpperCase():'—');
 put('profileStatus',user.email_confirmed_at?'Email verified':'Email confirmation pending');
 put('profileVerification',user.email_confirmed_at?'Email verified':'Email not verified');
 put('profilePhone',metadata.phone_number);
 put('profileCountry',metadata.country);
 put('profileAddress',[metadata.address_line,metadata.city,metadata.region,metadata.postal_code].filter(Boolean).join(', '));
 put('profileEmployment',metadata.employment_status?.replaceAll('_',' '));
 client.from('profiles').select('full_name,phone_number,country,address_line,city,region,postal_code,employment_status').eq('id',user.id).maybeSingle().then(({data,error})=>{
  if(error){console.warn('Customer profile could not be loaded. Configure the profiles table and customer row-level security policies.',error.message);return;}
  if(data){put('profileFullName',data.full_name||metadata.full_name);put('profilePhone',data.phone_number);put('profileCountry',data.country);put('profileAddress',[data.address_line,data.city,data.region,data.postal_code].filter(Boolean).join(', '));put('profileEmployment',data.employment_status?.replaceAll('_',' '));}
 }).catch(error=>console.warn('Customer profile could not be loaded.',error.message));
}
async function showDashboard(user){setProfile(user);dashboard.hidden=false;loader.hidden=true;try{await loadCustomerRecords(user.id);}catch(error){if(refreshMessage)refreshMessage.textContent='Unable to load your records: '+(error.message||'Please refresh and try again.');}
 const channel=client.channel('customer-records-'+user.id);
 ['loan_applications','investment_records','investment_enquiries'].forEach(table=>channel.on('postgres_changes',{event:'*',schema:'public',table,filter:'user_id=eq.'+user.id},()=>{void loadCustomerRecords(user.id).catch(error=>{if(refreshMessage)refreshMessage.textContent='Live refresh failed: '+(error.message||'Please refresh your records.');});}));
 channel.subscribe(status=>{if(status==='CHANNEL_ERROR'||status==='TIMED_OUT')console.warn('Live dashboard updates are unavailable; records will refresh periodically.');});
 const refreshTimer=window.setInterval(()=>{if(!document.hidden)void loadCustomerRecords(user.id).catch(error=>{if(refreshMessage)refreshMessage.textContent='Automatic refresh failed: '+(error.message||'Please refresh your records.');});},30000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)void loadCustomerRecords(user.id).catch(error=>{if(refreshMessage)refreshMessage.textContent='Refresh failed: '+(error.message||'Please refresh your records.');});});
 window.addEventListener('pagehide',()=>{window.clearInterval(refreshTimer);void client.removeChannel(channel);},{once:true});
}
document.getElementById('refreshCustomerRecords').addEventListener('click',async event=>{const button=event.currentTarget;button.disabled=true;try{const {data:{user},error}=await client.auth.getUser();if(error)throw error;if(!user?.email_confirmed_at)throw new Error('Please sign in again to refresh your records.');await loadCustomerRecords(user.id);}catch(error){if(refreshMessage)refreshMessage.textContent=error.message||'Refresh failed. Please try again.';}finally{button.disabled=false;}});
document.getElementById('logoutBtn').addEventListener('click',async event=>{const button=event.currentTarget;button.disabled=true;try{const {error}=await client.auth.signOut();if(error)throw error;window.location.replace('index.html?auth=signin');}catch(error){if(refreshMessage)refreshMessage.textContent='Sign out failed: '+(error.message||'Please try again.');button.disabled=false;}});
const themeButton=document.getElementById('dashTheme');
function applyDashboardTheme(theme){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='dark'?'☀':'☾';try{localStorage.setItem('lendvestra-theme',theme);}catch(error){console.warn('Theme preference could not be saved.',error.message);}}
try{const savedTheme=localStorage.getItem('lendvestra-theme');applyDashboardTheme(savedTheme==='dark'?'dark':'light');}catch(error){applyDashboardTheme('light');console.warn('Theme preference could not be loaded.',error.message);}
themeButton.addEventListener('click',()=>applyDashboardTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
document.querySelectorAll('[data-dash-action]').forEach(button=>button.addEventListener('click',()=>{const action=button.dataset.dashAction;if(action==='loan')window.location.href='loan.html';else if(action==='invest')window.location.href='investment.html';else if(action==='funding'||action==='contact')window.location.href='index.html?enquiry='+encodeURIComponent(action);}));
if(!client){showAuthFailure('Supabase connection is unavailable. Return to the sign-in page and try again.');}
else{
 client.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT')window.location.replace('index.html?auth=signin');});
 client.auth.getSession().then(async({data,error})=>{
  if(error)throw error;
  if(!data.session){window.location.replace('index.html?auth=signin');return;}
  const {data:{user},error:userError}=await client.auth.getUser();
  if(userError)throw userError;
  if(!user?.email_confirmed_at){const {error:signOutError}=await client.auth.signOut({scope:'local'});if(signOutError)throw signOutError;window.location.replace('index.html?auth=signin');return;}
  await showDashboard(user);
 }).catch(error=>showAuthFailure(error.message||'Could not verify your session. Return to sign in and try again.'));
}
})();
} else if (page === "admin") {
(()=>{'use strict';
const SUPABASE_URL='https://cgzvqtrasdcjfylfuktf.supabase.co';
// Publishable/anon key is intended for browser use; access must be enforced by RLS.
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_rxSTPCOTV-bRTQci_PO-jQ_M_iRC6fW';
const db=window.supabase?.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const $=id=>document.getElementById(id);let currentUser=null;
const statusOptions={loan:['Submitted','Under review','More information required','Approved','Declined','Closed'],enquiry:['Received','Under review','Responded','Closed'],investment:['Enquiry','Pending verification','Active','Matured','Closed','Cancelled']};
const safe=v=>String(v??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=v=>v?new Date(v).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—';
const fmtMoney=(v,c='USD')=>v==null?'—':`${safe(c)} ${Number(v).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
function message(id,s,error=false){$(id).textContent=s;$(id).classList.toggle('error',error)}
function showApp(user){currentUser=user;$('loginPanel').classList.add('hidden');$('adminApp').classList.remove('hidden');$('signOut').classList.remove('hidden');$('adminIdentity').textContent=user.email||'Authorised administrator';}
function showLogin(){currentUser=null;$('loginPanel').classList.remove('hidden');$('adminApp').classList.add('hidden');$('signOut').classList.add('hidden');$('adminIdentity').textContent='';}
async function guardSession(){if(!db){message('loginMessage','Supabase library did not load. Refresh and try again.',true);return;}const {data:{session}}=await db.auth.getSession();if(!session){showLogin();return;}const {data:{user},error}=await db.auth.getUser();if(error||!user){showLogin();return;}if(user.app_metadata?.role!=='admin'){await db.auth.signOut();showLogin();message('loginMessage','Access denied. This account has not been assigned the administrator role by a trusted Supabase administrator.',true);return;}showApp(user);await refreshAll();}
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();const b=$('loginButton');b.disabled=true;message('loginMessage','Signing in…');try{const {data,error}=await db.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});if(error)throw error;if(!data.user?.email_confirmed_at)throw new Error('Verify this account email before continuing.');if(data.user?.app_metadata?.role!=='admin'){await db.auth.signOut();throw new Error('Access denied. An authorised administrator must assign the admin role in Supabase Auth app_metadata.');}message('loginMessage','');showApp(data.user);await refreshAll();}catch(err){message('loginMessage',err.message||'Sign in failed.',true);}finally{b.disabled=false;}});
$('signOut').addEventListener('click',async()=>{await db.auth.signOut();showLogin();});
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[id^="tab-"]').forEach(x=>x.classList.add('hidden'));$('tab-'+b.dataset.tab).classList.remove('hidden');}));document.querySelectorAll('[data-refresh]').forEach(b=>b.addEventListener('click',refreshAll));
function tableHTML(headers,rows){if(!rows.length)return '<div class="empty">No records found.</div>';return '<table><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table>';}
function statusCell(id,status,kind){return '<select aria-label="Update status" data-status-id="'+safe(id)+'" data-status-kind="'+kind+'">'+statusOptions[kind].map(s=>'<option '+(s===status?'selected':'')+'>'+safe(s)+'</option>').join('')+'</select><button type="button" data-save-status="'+safe(id)+'" data-status-kind="'+kind+'">Save</button>';}
function row(cells){return '<tr>'+cells.map(x=>'<td>'+x+'</td>').join('')+'</tr>';}
async function getRows(table,select){const {data,error}=await db.from(table).select(select).order('created_at',{ascending:false}).limit(200);if(error)throw error;return data||[];}
async function refreshAll(){if(!currentUser)return;message('appMessage','Refreshing records…');try{const [loans,ies,support,investments]=await Promise.all([getRows('loan_applications','id,user_id,reference_code,requested_amount,currency,purpose,status,created_at'),getRows('investment_enquiries','id,user_id,full_name,email,phone,contact_method,interest_range,category,message,status,created_at'),getRows('support_enquiries','id,user_id,full_name,email,phone,contact_method,category,message,status,created_at'),getRows('investment_records','id,user_id,plan_name,principal_amount,currency,start_date,expected_earnings,maturity_date,status,created_at')]);$('loanTotal').textContent=loans.length;$('investmentTotal').textContent=ies.length;$('supportTotal').textContent=support.length;
$('loansTable').innerHTML=tableHTML(['Reference / customer UUID','Amount','Purpose','Submitted','Status / action'],loans.map(r=>row(['<strong>'+safe(r.reference_code||r.id.slice(0,8))+'</strong><br><small>'+safe(r.user_id)+'</small>',fmtMoney(r.requested_amount,r.currency),safe(r.purpose||'—'),fmtDate(r.created_at),statusCell(r.id,r.status||'Submitted','loan')])));
$('investmentEnquiriesTable').innerHTML=tableHTML(['Customer / contact','Interest / category / message','Submitted','Status / action'],ies.map(r=>row(['<strong>'+safe(r.full_name)+'</strong><br>'+safe(r.email)+'<br>'+safe(r.phone||'No phone supplied')+'<br><small>Preferred contact: '+safe(r.contact_method||'Not specified')+'</small><br><small>'+safe(r.user_id)+'</small>','<strong>'+safe(r.category)+'</strong><br><strong>Interest range:</strong> '+safe(r.interest_range||'Not specified')+'<br>'+safe(r.message),fmtDate(r.created_at),statusCell(r.id,r.status||'Received','enquiry')] )));
$('supportTable').innerHTML=tableHTML(['Customer / contact','Category / message','Submitted','Status / action'],support.map(r=>row(['<strong>'+safe(r.full_name)+'</strong><br>'+safe(r.email)+'<br>'+safe(r.phone||'No phone supplied')+'<br><small>'+safe(r.contact_method||'Contact method not specified')+'</small><br><small>'+safe(r.user_id)+'</small>','<strong>'+safe(r.category)+'</strong><br>'+safe(r.message),fmtDate(r.created_at),statusCell(r.id,r.status||'Received','enquiry')])));
$('recordsTable').innerHTML=tableHTML(['Customer UUID','Plan','Principal','Expected earnings','Dates','Status'],investments.map(r=>row([safe(r.user_id),safe(r.plan_name),fmtMoney(r.principal_amount,r.currency),fmtMoney(r.expected_earnings,r.currency),fmtDate(r.start_date)+' – '+fmtDate(r.maturity_date),safe(r.status)])));
message('appMessage','Records refreshed. Displaying up to 200 most recent rows per section.');
}catch(err){message('appMessage','Could not load records: '+(err.message||'Check schema, grants, RLS and admin role.'),true);}}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-save-status]');if(!b)return;const kind=b.dataset.statusKind,id=b.dataset.saveStatus,sel=document.querySelector('[data-status-id="'+CSS.escape(id)+'"][data-status-kind="'+kind+'"]');if(!sel)return;b.disabled=true;try{const table=kind==='loan'?'loan_applications':kind==='investment'?'investment_records':sel.closest('#tab-investmentEnquiries')?'investment_enquiries':'support_enquiries';const update=kind==='loan'||kind==='investment'?{status:sel.value,updated_at:new Date().toISOString()}:{status:sel.value};const {error}=await db.from(table).update(update).eq('id',id);if(error)throw error;message('appMessage','Status updated.');await refreshAll();}catch(err){message('appMessage','Status update failed: '+err.message,true);}finally{b.disabled=false;}});
$('investmentForm').addEventListener('submit',async e=>{e.preventDefault();if(!currentUser)return;const b=$('saveInvestment');b.disabled=true;message('investmentMessage','Saving…');try{const customerId=$('customerId').value.trim();if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(customerId))throw new Error('Enter a valid customer Auth UUID.');const principal=Number($('principal').value),earnings=$('earnings').value===''?null:Number($('earnings').value);if(!(principal>0)|| (earnings!==null&&earnings<0))throw new Error('Check the principal and earnings amounts.');const start=$('startDate').value||null,maturity=$('maturityDate').value||null;if(start&&maturity&&maturity<start)throw new Error('Maturity date cannot be before the start date.');const payload={user_id:customerId,plan_name:$('planName').value.trim(),principal_amount:principal,currency:$('currency').value,start_date:start,maturity_date:maturity,expected_earnings:earnings,status:$('recordStatus').value};const {error}=await db.from('investment_records').insert(payload);if(error)throw error;e.target.reset();message('investmentMessage','Investment record saved. Confirm it appears in the records list.');await refreshAll();}catch(err){message('investmentMessage',err.message||'Could not save the investment record.',true);}finally{b.disabled=false;}});
db?.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT')showLogin();});guardSession();
})();
} else if (page === "loan-application") {
const SUPABASE_URL='https://cgzvqtrasdcjfylfuktf.supabase.co';const SUPABASE_PUBLISHABLE_KEY='sb_publishable_rxSTPCOTV-bRTQci_PO-jQ-M_iRC6fW';const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});const form=document.getElementById('requestForm');const authMessage=document.getElementById('authMessage');const signedOutActions=document.getElementById('signedOutActions');const withdrawalRequest=new URLSearchParams(location.search).get('request')==='withdrawal';let currentUser=null;
if(withdrawalRequest){document.querySelector('.intro h1').textContent='Request a loan withdrawal review.';document.querySelector('.intro p').textContent='Tell our team which amount you would like to discuss. This is an enquiry only, not a disbursement or guarantee of funds.';document.querySelector('.panel .notice').textContent='This form records a request for staff review only. No funds are transferred or disbursed. Never enter passwords, card details, or bank login information.';document.querySelector('label[for="amount"]').textContent='Amount to discuss (NGN)';document.getElementById('purposeLabel').textContent='Reason for your request';[['incomeField','income'],['employmentField','employment'],['periodField','period']].forEach(([fieldId,inputId])=>{document.getElementById(fieldId).hidden=true;document.getElementById(inputId).required=false;});}
(async()=>{try{const {data,error}=await db.auth.getUser();if(error)throw error;currentUser=data.user;if(!currentUser){authMessage.textContent='Please sign in to your LENDVESTRA account before submitting this form.';signedOutActions.hidden=false;document.getElementById('goSignIn').href='index.html';return}if(!currentUser.email_confirmed_at){authMessage.textContent='Please verify your email address before submitting an enquiry. Check your email for the verification link.';return}authMessage.textContent='Signed in as '+currentUser.email+'. Complete the form below.';form.hidden=false;}catch(e){authMessage.textContent='We could not verify your session. Please return to the homepage and sign in again.';signedOutActions.hidden=false;}})();
form.addEventListener('submit',async e=>{e.preventDefault();if(!currentUser||!currentUser.email_confirmed_at){document.getElementById('result').textContent='A verified account is required.';return}if(!form.reportValidity())return;const btn=document.getElementById('submitBtn'),result=document.getElementById('result');btn.disabled=true;btn.textContent='Submitting…';result.textContent='';try{const val=id=>document.getElementById(id).value.trim();let payload;if(withdrawalRequest){payload={user_id:currentUser.id,full_name:currentUser.user_metadata?.full_name||currentUser.user_metadata?.name||currentUser.email,email:currentUser.email,phone:val('phone'),contact_method:'Email',category:'Loan withdrawal request',message:'Requested amount: NGN '+val('amount')+'. Reason: '+val('purpose'),consent_recorded:true};const {error}=await db.from('support_enquiries').insert(payload);if(error)throw error;}else{payload={user_id:currentUser.id,requested_amount:Number(val('amount')),currency:'NGN',purpose:val('purpose'),monthly_income_range:val('income'),employment_or_business:val('employment'),repayment_period:val('period'),applicant_phone:val('phone'),reference_code:'LV-'+crypto.randomUUID().slice(0,8).toUpperCase()};const {error}=await db.from('loan_applications').insert(payload);if(error)throw error;}form.reset();result.textContent=withdrawalRequest?'Your withdrawal request has been sent to the team for review. No funds have been transferred.':'Your enquiry has been submitted securely. Reference: '+(payload.reference_code||'record saved')+'. You can review updates from your customer dashboard.';}catch(err){result.textContent='Submission failed: '+(err.message||'Please try again later.');}finally{btn.disabled=false;btn.textContent='Submit enquiry securely';}});
} else if (page === "investment-enquiry") {
const SUPABASE_URL='https://cgzvqtrasdcjfylfuktf.supabase.co';const SUPABASE_PUBLISHABLE_KEY='sb_publishable_rxSTPCOTV-bRTQci_PO-jQ-M_iRC6fW';const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});const form=document.getElementById('requestForm');const authMessage=document.getElementById('authMessage');const signedOutActions=document.getElementById('signedOutActions');const requestType=new URLSearchParams(location.search).get('request');const investmentRequest=['deposit','withdrawal'].includes(requestType)?requestType:null;let currentUser=null;
if(investmentRequest){const isDeposit=investmentRequest==='deposit';document.getElementById('pageTitle').textContent=isDeposit?'Request an investment deposit review.':'Request an investment withdrawal review.';document.getElementById('pageDescription').textContent='Provide the requested amount and currency so our team can review your enquiry. This form does not move funds.';document.getElementById('requestNotice').textContent='This form records an enquiry for staff review only. No funds are accepted or transferred, and investment returns are not guaranteed. Never enter passwords, card details, or bank login information.';document.getElementById('interestField').hidden=true;document.getElementById('rangeField').hidden=true;document.getElementById('interest').required=false;document.getElementById('range').required=false;document.getElementById('messageLabel').textContent='Requested amount, currency, and any relevant details';document.getElementById('message').placeholder='For example: NGN 50,000 deposit request. Include any details the team should know.';}
(async()=>{try{const {data,error}=await db.auth.getUser();if(error)throw error;currentUser=data.user;if(!currentUser){authMessage.textContent='Please sign in to your LENDVESTRA account before submitting this form.';signedOutActions.hidden=false;document.getElementById('goSignIn').href='index.html';return}if(!currentUser.email_confirmed_at){authMessage.textContent='Please verify your email address before submitting an enquiry. Check your email for the verification link.';return}authMessage.textContent='Signed in as '+currentUser.email+'. Complete the form below.';form.hidden=false;}catch(e){authMessage.textContent='We could not verify your session. Please return to the homepage and sign in again.';signedOutActions.hidden=false;}})();
form.addEventListener('submit',async e=>{e.preventDefault();if(!currentUser||!currentUser.email_confirmed_at){document.getElementById('result').textContent='A verified account is required.';return}if(!form.reportValidity())return;const btn=document.getElementById('submitBtn'),result=document.getElementById('result');btn.disabled=true;btn.textContent='Submitting…';result.textContent='';try{const val=id=>document.getElementById(id).value.trim();const payload={user_id:currentUser.id,full_name:currentUser.user_metadata?.full_name||currentUser.user_metadata?.name||currentUser.email,email:currentUser.email,phone:val('phone'),contact_method:val('contact'),interest_range:investmentRequest?null:val('range')||null,category:investmentRequest?(investmentRequest==='deposit'?'Investment deposit request':'Investment withdrawal request'):val('interest'),message:val('message'),consent_recorded:true};const {error}=await db.from('investment_enquiries').insert(payload);if(error)throw error;form.reset();result.textContent=investmentRequest?'Your '+investmentRequest+' request has been sent to the team for review. No funds have been transferred.':'Your enquiry has been submitted securely. You can review updates from your customer dashboard.';}catch(err){result.textContent='Submission failed: '+(err.message||'Please try again later.');}finally{btn.disabled=false;btn.textContent='Submit enquiry securely';}});
}
})();
