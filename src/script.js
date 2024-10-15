const clientId = "5f56bd6a2551494ca8579167c145bedf";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");


if(!code){
    redirectToAuthCodeFlow(clientId);
}else{
    const accessToken = await getAccessToken(clientId,code);
    const profile = await fetchProfile(accessToken);
    const trackMed = await fetchTopTracksMed(accessToken);
    const trackShort = await fetchTopTracksShort(accessToken);
    const artistMed = await fetchTopArtistsMed(accessToken);
    const artistShort = await fetchTopArtistsShort(accessToken);
    populateUP(profile);
    populateUM(trackMed);
    populateSU(trackShort);
    populateAU(artistMed);
    populateAUS(artistShort);
}




export async function redirectToAuthCodeFlow(clientId){

    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier",verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri","http://topdata.viperwebdev.com/callback");
    params.append("scope","user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length){
    let text='';
    let possible='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i =0; i<length;i++){
        text+= possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier){
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256',data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://topdata.viperwebdev.com/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token){

    const result = await fetch("https://api.spotify.com/v1/me",{
        method:"GET",headers:{ Authorization: `Bearer ${token}`}
    });
    return await result.json();
}

async function fetchTopTracksMed(token){
    const result1 = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0",{
        method:"GET", headers: {Authorization: `Bearer ${token}` }
    });
    return await result1.json();
}

async function fetchTopTracksShort(token){
    const resultShort = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0",{
        method:"GET", headers: {Authorization: `Bearer ${token}`}
    });
    return await resultShort.json();
}

async function fetchTopArtistsMed(token){
    const resultArtM = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0",{
        method:"GET", headers:{Authorization: `Bearer ${token}`}
    });
    return await resultArtM.json();
}

async function fetchTopArtistsShort(token){
    const resultArtS = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0",{
        method:"GET", headers:{Authorization: `Bearer ${token}`}
    });
    return await resultArtS.json();
}

function populateUP(profile){
    document.getElementById("displayName").innerText = profile.display_name;
    if(profile.images[0]){
        const profileImage = new Image(200,200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
    }
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
}

function populateUM(profile){
    for(let i=0;i<10;i++){
        let c = "num"+(i+1);
        document.getElementById(c).innerText = profile.items[i].name;
    }
}

function populateSU(profile){
    for(let i=0;i<10;i++){
        let c= "sNum"+(i+1);
        document.getElementById(c).innerText = profile.items[i].name;
    }
}

function populateAU(profile){
    for(let i=0;i<10;i++){
        let c = "aNum"+(i+1);
        document.getElementById(c).innerText = profile.items[i].name;
    }
}

function populateAUS(profile){
    for(let i=0;i<10;i++){
        let c ="aNumS"+(i+1);
        document.getElementById(c).innerText = profile.items[i].name;
    }
}
