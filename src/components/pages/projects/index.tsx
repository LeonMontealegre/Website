import {GetMoonInfo, MoonInfo} from "utils/planets";
import {BackArrow} from "components/BackArrow";

import styles from "./index.module.scss";


type BaseProjectPageProps = {
    project: MoonInfo;
    imgHeight?: number;
    onBackClick: () => void;

    children: React.ReactNode;
}
const BaseProjectPage = ({ project, imgHeight, onBackClick, children }: BaseProjectPageProps) => {
    return (
        <main className={styles["content"]} role="main">
            <BackArrow onBackClick={onBackClick} />
            <img alt={`${project.title} thumbnail`} src={project.banner} style={{ height: `${imgHeight}px` }} />
            <h1>{project.title}</h1>
            <div className={styles["main-text"]}>
                <p>{project.desc}</p>
            </div>
            {children}
            <br/><br/><br/>
        </main>
    );
}


type ProjectProps = {
    onBackClick: () => void;
}
export const Project_OpenCircuits = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "OpenCircuits")!}
                         imgHeight={450}
                         onBackClick={onBackClick}>
            <div className={styles["bottom"]}>
                <a type="button" 
                   href="https://github.com/OpenCircuits/OpenCircuits" 
                   target="_blank"
                   style={{ marginRight: "50px" }}>Github</a>
                <a type="button" href="https://opencircuits.io/" target="_blank">Site</a>
            </div>
        </BaseProjectPage>
    );
}
export const Project_DoublePendulum = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "DoublePendulum")!} onBackClick={onBackClick}>
            <div>
                <p>All computation is done using RK4 entirely using WebAssembly!</p>
                <p>The governing equations of a double pendulum are as follows:</p>
                <img alt="Double Pendulum Equations" src="/projects/DoublePendulum/equations.png"></img>
            </div>
            <div className={styles["bottom"]}>
                <a type="button" href="/projects/DoublePendulum/app/index.html" target="_blank">Go to simulation</a>
            </div>
        </BaseProjectPage>
    );
}
export const Project_SWEs = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "SWEs")!} onBackClick={onBackClick}>
            <div>
                <p>My research paper on the topic, along with my presentation and results can be seen below</p>
                <br/><br/>
                <embed src="/projects/SWEs/paper.pdf" width="800px" height="1000px" />
                <br/><br/><br/><br/><br/><br/>
                <iframe src="https://docs.google.com/presentation/d/19_EISiSXjpM7-AgrogOHMOiWsPJMq7SABNKQ-35AHiM/embed?start=false&amp;loop=false&amp;delayms=3000" frameBorder="0" width="800px" height="500px" allowFullScreen>
                        Your browser does not support iframes
                </iframe>
            </div>
        </BaseProjectPage>
    );
}
export const Project_SPH = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "SPH")!} onBackClick={onBackClick}>
            <div>
                <p>My research paper on the topic, along with my presentation and results can be seen below</p>
            </div>
            <div className={styles["bottom"]}>
                <p>(Press A on a simulation to play/pause it)</p>
                <a type="button" href="/projects/SPH/app/index.html" target="_blank">Open Interactive Presentation</a>
            </div>
            <div>
                <embed src="/projects/SPH/paper.pdf" width="800px" height="1000px" />
            </div>
        </BaseProjectPage>
    );
}
export const Project_Mandelbrot = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "Mandelbrot")!} onBackClick={onBackClick}>
            <div>
                <p>A really simple Mandelbrot set visualizer I made in a couple of hours using JavaScript + WebGL.</p>
                <p>I made it because I've always heard about it, but never really understood what it represented or how it worked.<br/>
                    I also (for fun) made a golfed version which is &lt; 1500 characters and fully interactive but completely illegible, which I will put at the end of this post.</p>
                <p>You can use it for yourself right here!</p>
                <p>(Mouse to pan, scroll wheel to zoom in and out - not tested on mobile)</p>
            </div>
            <div className={styles["bottom"]}>
                <a type="button" href="/projects/Mandelbrot/app/index.html" target="_blank">Go to visualizer</a>
            </div>
            <div>
                Here's the golfed code: 1,339 characters
            </div>
            <div style={{ lineHeight: 1.5, fontSize: "initial", fontWeight: "initial", textAlign: "left" }} dangerouslySetInnerHTML={{__html: `
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007700">&lt;canvas</span> <span style="color: #0000CC">id=</span><span style="background-color: #fff0f0">&quot;g&quot;</span> <span style="color: #0000CC">width=</span><span style="background-color: #fff0f0">&quot;640&quot;</span> <span style="color: #0000CC">height=</span><span style="background-color: #fff0f0">&quot;480&quot;</span><span style="color: #007700">&gt;&lt;/canvas&gt;</span>
<span style="color: #007700">&lt;script&gt;</span>
c<span style="color: #333333">=</span><span style="color: #007020">document</span>.getElementById(<span style="background-color: #fff0f0">&#39;g&#39;</span>);
g<span style="color: #333333">=</span>c.getContext(<span style="background-color: #fff0f0">&#39;webgl&#39;</span>);
q<span style="color: #333333">=</span><span style="color: #007020">Object</span>.getOwnPropertyNames(WebGLRenderingContext.prototype);
a<span style="color: #333333">=</span><span style="color: #0000DD; font-weight: bold">34962</span>,b<span style="color: #333333">=</span>a<span style="color: #333333">+</span><span style="color: #0000DD; font-weight: bold">82</span>,e<span style="color: #333333">=</span><span style="color: #0000DD; font-weight: bold">35633</span>,m<span style="color: #333333">=</span>q[<span style="color: #0000DD; font-weight: bold">301</span>],h<span style="color: #333333">=</span><span style="background-color: #fff0f0">&#39;addEventListener&#39;</span>;
<span style="color: #008800; font-weight: bold">function</span> k(i,a){g[q[<span style="color: #0000DD; font-weight: bold">303</span>]](i,g[q[<span style="color: #0000DD; font-weight: bold">325</span>]]());g[q[<span style="color: #0000DD; font-weight: bold">312</span>]](i,a,b);}
k(a,<span style="color: #008800; font-weight: bold">new</span> Float32Array([<span style="color: #333333">-</span><span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #333333">-</span><span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #333333">-</span><span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #333333">-</span><span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #0000DD; font-weight: bold">1</span>]));
k(a<span style="color: #333333">+</span><span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #008800; font-weight: bold">new</span> Uint16Array([<span style="color: #0000DD; font-weight: bold">3</span>,<span style="color: #0000DD; font-weight: bold">2</span>,<span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #0000DD; font-weight: bold">3</span>,<span style="color: #0000DD; font-weight: bold">1</span>,<span style="color: #0000DD; font-weight: bold">0</span>]));
<span style="color: #008800; font-weight: bold">function</span> j(i,t){r<span style="color: #333333">=</span>g[q[<span style="color: #0000DD; font-weight: bold">329</span>]](i);g[q[<span style="color: #0000DD; font-weight: bold">394</span>]](r,t);g[q[<span style="color: #0000DD; font-weight: bold">320</span>]](r);<span style="color: #008800; font-weight: bold">return</span> r;}
v<span style="color: #333333">=</span>j(e,<span style="background-color: #fff0f0">&#39;attribute vec2 c;void main(){gl_Position=vec4(c,0,1);}&#39;</span>);
f<span style="color: #333333">=</span>j(e<span style="color: #333333">-</span><span style="color: #0000DD; font-weight: bold">1</span>,<span style="background-color: #fff0f0">&#39;precision highp float;uniform vec3 z;</span>
<span style="background-color: #fff0f0">#define l length</span>
<span style="background-color: #fff0f0">#define v vec2</span>
<span style="background-color: #fff0f0">void main(){v u=(gl_FragCoord.xy*v(4./640.,4./480.)-v(2,2))/z.x+v(z.y,z.z);v z=v(0);int ai;for(int i=0;i&lt;500;i++){ai=i;z=v(z.x*z.x-z.y*z.y,2.*z.x*z.y)+u;if(l(z)&gt;=2.)break;}gl_FragColor=vec4(vec3(1./log(float(ai)/500.)+1.),1);}&#39;</span>);
s<span style="color: #333333">=</span>g[q[<span style="color: #0000DD; font-weight: bold">327</span>]]();g[m](s,v);g[m](s,f);
g[q[<span style="color: #0000DD; font-weight: bold">387</span>]](s);g[q[<span style="color: #0000DD; font-weight: bold">424</span>]](s);
g[q[<span style="color: #0000DD; font-weight: bold">302</span>]](s,<span style="color: #0000DD; font-weight: bold">0</span>,<span style="background-color: #fff0f0">&#39;c&#39;</span>);
l<span style="color: #333333">=</span>g[q[<span style="color: #0000DD; font-weight: bold">374</span>]](s,<span style="background-color: #fff0f0">&#39;z&#39;</span>);
g[q[<span style="color: #0000DD; font-weight: bold">413</span>]](l,<span style="color: #6600EE; font-weight: bold">0.5</span>,<span style="color: #0000DD; font-weight: bold">0</span>,<span style="color: #0000DD; font-weight: bold">0</span>);
g[q[<span style="color: #0000DD; font-weight: bold">434</span>]](<span style="color: #0000DD; font-weight: bold">0</span>,<span style="color: #0000DD; font-weight: bold">2</span>,<span style="color: #0000DD; font-weight: bold">5126</span>,<span style="color: #0000DD; font-weight: bold">0</span>,<span style="color: #0000DD; font-weight: bold">0</span>,<span style="color: #0000DD; font-weight: bold">0</span>);g[q[<span style="color: #0000DD; font-weight: bold">347</span>]](<span style="color: #0000DD; font-weight: bold">0</span>);
x<span style="color: #333333">=</span>y<span style="color: #333333">=</span>i<span style="color: #333333">=</span>j<span style="color: #333333">=</span>n<span style="color: #333333">=</span>m<span style="color: #333333">=</span><span style="color: #0000DD; font-weight: bold">0</span>,z<span style="color: #333333">=</span>z2<span style="color: #333333">=</span><span style="color: #0000DD; font-weight: bold">1</span>;
c[h](<span style="background-color: #fff0f0">&#39;mousedown&#39;</span>,(e)<span style="color: #333333">=&gt;</span>{m<span style="color: #333333">=</span><span style="color: #0000DD; font-weight: bold">1</span>;u()});
c[h](<span style="background-color: #fff0f0">&#39;mouseup&#39;</span>,(e)<span style="color: #333333">=&gt;</span>{m<span style="color: #333333">=</span><span style="color: #0000DD; font-weight: bold">0</span>});
c[h](<span style="background-color: #fff0f0">&#39;mousemove&#39;</span>,(e)<span style="color: #333333">=&gt;</span>{<span style="color: #008800; font-weight: bold">var</span> q<span style="color: #333333">=</span>.<span style="color: #0000DD; font-weight: bold">5</span><span style="color: #333333">-</span>e.clientX<span style="color: #333333">/</span><span style="color: #0000DD; font-weight: bold">640</span>,w<span style="color: #333333">=</span>e.clientY<span style="color: #333333">/</span><span style="color: #0000DD; font-weight: bold">480</span><span style="color: #333333">+</span>.<span style="color: #0000DD; font-weight: bold">5</span>;<span style="color: #008800; font-weight: bold">if</span>(m<span style="color: #333333">==</span><span style="color: #0000DD; font-weight: bold">1</span>)x<span style="color: #333333">+=</span><span style="color: #0000DD; font-weight: bold">2</span><span style="color: #333333">*</span>(q<span style="color: #333333">-</span>i)<span style="color: #333333">/</span>z2,y<span style="color: #333333">+=</span><span style="color: #0000DD; font-weight: bold">2</span><span style="color: #333333">*</span>(w<span style="color: #333333">-</span>j)<span style="color: #333333">/</span>z2;i<span style="color: #333333">=</span>q,j<span style="color: #333333">=</span>w;u()});
c[h](<span style="background-color: #fff0f0">&#39;wheel&#39;</span>,(e)<span style="color: #333333">=&gt;</span>{z<span style="color: #333333">=</span><span style="color: #007020">Math</span>.max(z<span style="color: #333333">+</span>e.wheelDelta<span style="color: #333333">/</span><span style="color: #0000DD; font-weight: bold">100</span>,<span style="color: #6600EE; font-weight: bold">0.5</span>);z2<span style="color: #333333">=</span>z<span style="color: #333333">*</span>z;u();<span style="color: #008800; font-weight: bold">return</span> <span style="color: #008800; font-weight: bold">false</span>},<span style="color: #008800; font-weight: bold">false</span>);
<span style="color: #008800; font-weight: bold">function</span> u(){g[q[<span style="color: #0000DD; font-weight: bold">413</span>]](l,z2,x,y),g[q[<span style="color: #0000DD; font-weight: bold">345</span>]](<span style="color: #0000DD; font-weight: bold">4</span>,<span style="color: #0000DD; font-weight: bold">6</span>,<span style="color: #0000DD; font-weight: bold">5123</span>,<span style="color: #0000DD; font-weight: bold">0</span>)}
u();
<span style="color: #007700">&lt;/script&gt;</span>
</pre></td></tr></table></div>
`}}></div>
        </BaseProjectPage>
    );
}
export const Project_NebularHypothesis = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "NebularHypothesis")!} onBackClick={onBackClick}>
            <div>
                <p>Very similar to my other gravity simulation: this simulation shows how a large collection of objects naturally forms to create a solar system similar to our own. There's almost always a single star in the middle and the occasional planets that orbit it. Most satellites of the star go in a single direction based on the original total angular velocity of the objects, while most retrograde ones quickly collide with other masses and either change direction or fall into the center.</p>
                <p>Here's an interactive version with parameters to fiddle around with.</p>
            </div>
            <div className={styles["bottom"]}>
                <p>(Note that more objects = more processing power, and as time passes, the faster the simulation is able to run)</p>
                <a type="button" href="/projects/NebularHypothesis/app/index.html" target="_blank">Go to visualizer</a>
            </div>
        </BaseProjectPage>
    );
}
export const Project_Gravity = ({ onBackClick }: ProjectProps) => {
    return (
        <BaseProjectPage project={GetMoonInfo("Projects", "Gravity")!} onBackClick={onBackClick}>
            <div>
                <p>A very simple simulator that I made using HTML, CSS, and Javascript.</p>
                <p>It was my first time ever really making anything with HTML, CSS, and Javascript alone and for fun.</p>
                <p>And since those are the languages of the web, you can use it for yourself right here!</p>
            </div>
            <div className={styles["bottom"]}>
                <a type="button" href="/projects/Gravity/app/index.html" target="_blank">Go to visualizer</a>
            </div>
        </BaseProjectPage>
    );
}


export const ProjectPages = {
    "OpenCircuits": Project_OpenCircuits,
    "DoublePendulum": Project_DoublePendulum,
    "SWEs": Project_SWEs,
    "SPH": Project_SPH,
    "Mandelbrot": Project_Mandelbrot,
    "NebularHypothesis": Project_NebularHypothesis,
    "Gravity": Project_Gravity,
} as const;
