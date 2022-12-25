import githubLogo from '../images/logos/github-mark-white.svg'
export default function Header(){
    return (<header>
        <div className="repoLink">
            <a href='https://github.com/ennemli/retrowave' target={'_blink'}> <img src={githubLogo} alt="the main repository" /></a> 
        </div>
    </header>)
}