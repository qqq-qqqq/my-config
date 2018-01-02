function FindProxyForURL(url, host) {

var eduList = {
'cnki.com.cn':1,
'cnki.net':1,
'wanfangdata.com':1,
'cqvip.com':1,
// ustc
'light.ustclug.org':1,
'tv.ustc.edu.cn':1,
'video.ustc.edu.cn':1,
'zbh.ustc.edu.cn':1,
// edu pt
'bt.neu6.edu.cn':1,
'hudbt.hust.edu.cn':1,
'npupt.com':1
};

var gfwList = {
// google
'android.com':1,
'appspot.com':1,
'google.com':1,
'withgoogle.com':1,
'googleapis.com':1,
'blogger.com':1,
'blogblog.com':1,
'blogspot.com':1,
'googlesource.com':1,
'google.com.hk':1,
'google.com.sg':1,
'google.com.tw':1,
'gstatic.com':1,
'google':1,
'googleusercontent.com':1,
'golang.org':1,
'googleapis.cn':1,
'googlepages.com':1,
'googleblog.com':1,
'ggpht.com':1,
'googlezip.net':1,
'youtube.com':1,
'youtu.be':1,
'youtube-nocookie.com':1,
'ytimg.com':1,
'googlevideo.com':1,
'gvt1.com':1,
'goo.gl':1,
// instagram
'instagram.com':1,
'cdninstagram.com':1,
// misc
'akamai.net':1,
'pinimg.com':1,
'pstatic.net':1,
'pinterest.com':1,
// pixiv
'pixiv.net':1,
// facebook
'facebook.com':1,
'facebook.net':1,
'fb.com':1,
'fb.me':1,
'fbcdn.net':1,
'thefacebook.com':1,
'messenger.com':1,
// wiki
'wikinews.org':1,
'wikimedia.org':1,
'wikipedia.org':1,
// telegram
't.me':1,
'telegram.me':1,
'telegram.org':1,
// tumblr
'tumblr.com':1
};

var gfwproxy = 'PROXY 10.17.17.1:17887; HTTPS light.ustclug.org:29980; DIRECT';
var eduproxy = 'PROXY 10.17.17.1:3128; DIRECT'

function testDomain(target, domains) {
    var idx = target.lastIndexOf('.');
    var hasOwnProperty = Object.hasOwnProperty;
    while (true) {
        if (idx === -1) {
            if (hasOwnProperty.call(domains, target)) {
                return true;
            } else {
                return false;
            }
        }
        suffix = target.substring(idx + 1);
        if (hasOwnProperty.call(domains, suffix)) {
            return true;
        }
        idx = target.lastIndexOf('.', idx - 1);
    }
}

// fix error message in FoxyProxy when switching tabs. http://verihy.me/posts/foxyproxy-pac/
if (typeof host === 'undefined'
    || isPlainHostName(host)
    || shExpMatch(url, "*://" + host + ":*")
    || host === '127.0.0.1'
    || host === 'localhost'
    || host === dnsResolve(host)
    || dnsResolve(host) === "10.17.17.1"
    || dnsResolve(host) === "202.38.64.9") {
    return 'DIRECT';
}
else if (testDomain(host, gfwList)) {
    return gfwproxy;
}
else if (testDomain(host, eduList)) {
    return eduproxy;
}

return 'DIRECT';

}
