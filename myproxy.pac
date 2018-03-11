function FindProxyForURL(url, host) {

var blkList = {
// baidu
'cb.baidu.com':1,
'cbjs.baidu.com':1,
'cbjslog.baidu.com':1,
'cpro.baidu.com':1,
'cpro.baidustatic.com':1,
'cpro.tieba.baidu.com':1,
'cpro.zhidao.baidu.com':1,
'drmcmm.baidu.com':1,
'duiwai.baidu.com':1,
'eiv.baidu.com':1,
'hm.baidu.com':1,
'mobads.baidu.com':1,
'pos.baidu.com':1,
// dianping
'stat.api.dianping.com':1,
// qq
'btrace.qq.com':1,
'bugly.qq.com':1,
'report.qq.com':1,
// netease
'analytics.163.com':1,
'c.youdao.com':1,
// zhihu
'zhihu-analytics.zhihu.com':1,
'zhihu-web-analytics.zhihu.com':1
}

var eduList = {
'cnki.com.cn':1,
'cnki.net':1,
'cqvip.com':1,
'wanfangdata.com.cn':1,
//
'aip.org':1,
'annualreviews.org':1,
'cambridge.org':1,
'ci.nii.ac.jp':1,
'computingreviews.com':1,
'iop.org':1,
'ieeexplore.ieee.org':1,
'journals.aps.org':1,
'mitpressjournals.org':1,
'nature.com':1,
'oup.com':1,
'pnas.org':1,
'sciencedirect.com':1,
'sciencemag.org':1,
'springer.com':1,
'wiley.com':1,
'worldscientific.com':1,
// 
'light.ustclug.org':1,
'servers.ustclug.org':1,
'tv.ustc.edu.cn':1,
'video.ustc.edu.cn':1,
'zbh.ustc.edu.cn':1,
// 
'bt.neu6.edu.cn':1,
'hudbt.hust.edu.cn':1,
'npupt.com':1
};

var gfwList = {
// apkpure
'apkpure.com':1,
// box
'box.net':1,
// facebook
'facebook.com':1,
'facebook.net':1,
'fb.com':1,
'fb.me':1,
'fbcdn.net':1,
'fbsbx.com':1,
'm.me':1,
'thefacebook.com':1,
'messenger.com':1,
'whatsapp.net':1,
'oculus.com':1,
'oculuscdn.com':1,
'instagram.com':1,
'cdninstagram.com':1,
// google
'android.com':1,
'appspot.com':1,
'blogger.com':1,
'blogblog.com':1,
'blogspot.com':1,
'ggpht.com':1,
'gmail.com':1,
'golang.org':1,
'goo.gl':1,
'google':1,
'google.com':1,
'google.com.hk':1,
'google.com.sg':1,
'google.com.tw':1,
'googleapis.cn':1,
'googleapis.com':1,
'googleblog.com':1,
'googlecode.com':1,
'googledrive.com':1,
'googlearth.com':1,
'googleearth.com':1,
'googlegroups.com':1,
'googlemail.com':1,
'googlepages.com':1,
'googleplay.com':1,
'googleplus.com':1,
'googlescholar.com':1,
'googlesource.com':1,
'googleusercontent.com':1,
'googlevideo.com':1,
'googlezip.net':1,
'gstatic.com':1,
'gvt0.com':1,
'gvt1.com':1,
'gvt3.com':1,
'tensorflow.org':1,
'withgoogle.com':1,
'withyoutube.com':1,
'youtu.be':1,
'youtube.com':1,
'youtube-nocookie.com':1,
'youtubeeducation.com':1,
'youtubegaming.com':1,
'yt.be':1,
'ytimg.com':1,
// openvpn
'openvpn.net':1,
'openvpn.org':1,
// mega
'mega.nz':1,
'megaproxy.com':1,
'megarotic.com':1,
'megavideo.com':1,
'imgmega.com':1,
'videomega.tv':1,
// misc
'akamai.net':1,
'akamaihd.net':1,
'cloudfront.net':1,
'onion.rip':1,
'pinimg.com':1,
'pstatic.net':1,
'pinterest.com':1,
// pcloud
'my.pcloud.com':1,
// pixiv
'pixiv.net':1,
// softether
'softether.org':1,
'softether-download.com':1,
// steam
'steamcommunity.com':1,
// telegram
't.me':1,
'telegram.me':1,
'telegram.org':1,
'telegramdownload.com':1,
// twitter
't.co':1,
'tweetdeck.com':1,
'twimg.com':1,
'twitpic.com':1,
'twitter.com':1,
'periscope.tv':1,
'pscp.tv':1,
'vine.co':1,
// tumblr
'tumblr.com':1,
// wiki
'wikipedia.org':1,
'mediawiki.org':1,
'wikibooks.org':1,
'wikidata.org':1,
'wikimedia.org':1,
'wikinews.org':1,
'wikisource.org':1,
'wikiquote.org':1,
'wikivoyage.org':1,
'wiktionary.org':1,
// v2ex
'v2ex.com':1
};

var gfwproxy = 'PROXY 10.17.17.1:17887; HTTPS light.ustclug.org:29980; DIRECT';
var eduproxy = 'SOCKS5 10.17.17.1:1080; SOCKS 10.17.17.1:1080; PROXY 10.17.17.1:3128; DIRECT';

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
else if (testDomain(host, blkList)) {
    return 'PROXY 127.0.0.1:16'
}
else if (testDomain(host, gfwList)) {
    return gfwproxy;
}
else if (testDomain(host, eduList)) {
    return eduproxy;
}

return 'DIRECT';

}
