import githubLogo from '../images/logos/github-mark-white.svg'
export default function Header(){
    return (<header>
        <div className='warning'><p><span>Warning:</span> For a better experience please visit this page from computer if you're using a phone.</p></div>
        <div className="repoLink">

            <a href='https://github.com/ennemli/retrowave' target={'_blink'}> <img src={githubLogo} alt="the main repository" /></a> 
        </div>
    </header>)
}
