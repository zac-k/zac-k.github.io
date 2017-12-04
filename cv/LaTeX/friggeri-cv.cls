\usepackage{graphicx}

\ProvidesClass{friggeri-cv}[2012/04/30 CV class]
\NeedsTeXFormat{LaTeX2e}

\DeclareOption{print}{\def\@cv@print{}}
\DeclareOption{header2}{\def\@cv@header2{}}
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{article}%
}
\ProcessOptions\relax
\LoadClass{article}
\usepackage{tabularx}

%%%%%%%%%%
% Colors %
%%%%%%%%%%

\RequirePackage{xcolor}

\definecolor{white}{RGB}{255,255,255}

\definecolor{darkgray}{HTML}{333333}
\definecolor{gray}{HTML}{4D4D4D}
%\definecolor{lightgray}{HTML}{999999}
\definecolor{lightgray2}{HTML}{848484}
\definecolor{lightgray}{HTML}{4D4D4D}

\definecolor{green}{HTML}{C2E15F}
\definecolor{orange}{HTML}{FDA333}
\definecolor{purple}{HTML}{D3A4F9}
\definecolor{red}{HTML}{FB4485}
\definecolor{blue}{HTML}{6CE0F1}
	\definecolor{darkblue}{rgb}{0.0, 0.0, 1.0}

\ifdefined\@cv@print
  \colorlet{green}{gray}
  \colorlet{orange}{gray}
  \colorlet{purple}{gray}
  \colorlet{brown}{gray}
  \colorlet{red}{gray}
  \colorlet{blue}{gray}
  \colorlet{fillheader}{white}
  \colorlet{header}{gray}
\else
  \colorlet{fillheader}{gray}
  \colorlet{header}{white}
\fi
\colorlet{textcolor}{gray}
\colorlet{headercolor}{gray}


\ifdefined\@cv@headergray
\colorlet{fillheader}{gray}
  \colorlet{header}{white}	
\else
	\colorlet{fillheader}{white}
  \colorlet{header}{gray}
\fi
%%%%%%%%%%
% Titles %
%%%%%%%%%%

	\newcommand{\dr}{Dr}
	\newcommand{\phd}{PhD}
	\newcommand{\bsc}{BSc}
	\newcommand{\hons}{Hons}
	\newcommand{\prof}{Prof.}
	
	



%%%%%%%%%%%%%%%%%
% Other symbols %
%%%%%%%%%%%%%%%%%

\usepackage{hologo}
\newcommand{\latex}{{\fontfamily{lmr}\selectfont\color{lightgray2}\hologo{LaTeX}}}
%\def\cpp{{C\nolinebreak[4]\hspace{-.05em}\raisebox{.4ex}{\tiny\bf ++}}}
\newcommand{\cpp}{\textsc{C++}}






%%%%%%%%%
% Fonts %
%%%%%%%%%

\RequirePackage[quiet]{fontspec}
\RequirePackage[math-style=TeX,vargreek-shape=unicode]{unicode-math}

\newfontfamily\bodyfont[]{SourceSansPro-Regular}
\newfontfamily\thinfont[]{SourceSansPro-ExtraLight}
\newfontfamily\headingfont[]{SourceSansPro-Bold}
\newfontfamily\pythonfont[]{Flux-Bold}

\defaultfontfeatures{Mapping=tex-text}
\setmainfont[Mapping=tex-text, Color=textcolor]{SourceSansPro-Light}

\def\thoughtBreak{\begin{center}\includegraphics[width=\textwidth]{thoughtbreak1.png}\end{center}}
%\setmathfont{XITS Math}

%%%%%%%%%%
% Header %
%%%%%%%%%%

\RequirePackage{tikz}
\usetikzlibrary{calc}

\newcommand{\doctype}[1]{{\begin{center}\Large \textit{#1}\end{center}}}

\newcommand{\rolefont}{%
  \fontsize{18pt}{28pt}\selectfont%
  \thinfont%
  \color{white}%
}

\newcommand{\header}[3]{%
  \begin{tikzpicture}[remember picture,overlay]
    \node [rectangle, fill=fillheader, anchor=north, minimum width=\paperwidth, minimum height=5cm] (box) at ($(current page.north)$){};
		\node [anchor=center] (name) at ($(box)+(0.0cm,0.5cm)$) {%
      \fontsize{48pt}{72pt}\color{header}%
      {\thinfont #1}{\bodyfont  #2}
    };
    \node [anchor=south]  at ($(name.north)+(0,0.25cm)$) {%
		\fontsize{14pt}{24pt}\color{header}%
      %\thinfont résumé of%
    };
		\node [anchor=north] (creds) at (name.south){%
      \fontsize{14pt}{24pt}\color{header}%
      \thinfont #3%
    };		
    \node [anchor=north] (squiggle) at ($(creds.south)+(0,-0.5cm)$) {%
		\includegraphics[width=\textwidth]{thoughtbreak1.png}		
		};
		
  \end{tikzpicture}
  %\vspace{1.5cm}
}



\newcommand{\thesistitle}[1]{
				{Thesis title}: \emph{``#1''}\\
				%\begin{center}
				%\rule[2pt]{100pt}{0.2pt}
				%\end{center}
				}
\newcommand{\thesisdesc}[1]{
				Description: \parbox[t]{12cm}{#1}
				}
				
\newcolumntype{C}[1]{>{\centering\let\newline\\\arraybackslash\hspace{0pt}}p{#1}}
\newcommand{\contact}[3]{
%\thoughtBreak

\vspace{1.5cm}
\begin{center}
\begin{tabular}{C{0.25\textwidth}C{0.25\textwidth}C{0.25\textwidth}C{0.25\textwidth}}
\includegraphics[scale=0.5]{home.png} & \includegraphics[scale=0.5]{mobile.png} & \includegraphics[scale=0.5]{email.png} & \includegraphics[scale=0.5]{www_b.png}\\
\begin{tabular}[c]{@{}c@{}c@{}}\addfontfeature{Color=darkgray}#1\end{tabular}
&
\addfontfeature{Color=darkgray}#2
&
\href{mailto:#3}{#3}
&
\href{http://zac-k.github.io}{zac-k.github.io}
\end{tabular}
\end{center}

\vspace{0.5cm}
%\thoughtBreak
}


%%%%%%%%%%%%%
% Structure %
%%%%%%%%%%%%%
\RequirePackage{parskip}

\newcounter{colorCounter}
\def\@sectioncolor#1#2#3{%
  {%
    \color{%
      \ifcase\value{colorCounter}%
        blue\or%
        red\or%
        orange\or%
        green\or%
        purple\or%
        brown\else%
        headercolor\fi%
    } #1#2#3%
  }%
  \stepcounter{colorCounter}%
}

\renewcommand{\section}[3]{
%\vspace{1cm}
  \par\vspace{\parskip}
  {%
    \Huge\headingfont\color{headercolor}%
		%\begin{center}
		%\includegraphics[scale=0.5]{#2}
		%\end{center}
		%\@sectioncolor #1
    \includegraphics[scale=0.4]{#2} \@sectioncolor #1%
		%\\
		%\includegraphics[width=0.25\textwidth]{#3}
		%\includegraphics[width=0.25\textwidth]{thoughtbreak1.png}
		%\@sectioncolor #1\hfill\includegraphics[scale=0.5]{#2}%
  }
  \par\vspace{\parskip}
}

\renewcommand{\subsection}[1]{
  \par\vspace{.5\parskip}%
  {\huge\headingfont\color{headercolor} #1}
  \par\vspace{.25\parskip}%
}

\renewcommand{\subsubsection}[2]{
  \par\vspace{.5\parskip}%
  {\LARGE\headingfont\color{headercolor} #2}
  \par\vspace{.25\parskip}%
}

\pagestyle{empty}


\newenvironment{entrydesc}{}{\begin{center}\hbar\end{center}}

%%%%%%%%%%%%%%%%%%%%%%%%%
% Objective environment %
%%%%%%%%%%%%%%%%%%%%%%%%%

\setlength{\tabcolsep}{0pt}
\newenvironment{objective}{\begin{center}
%\includegraphics[scale=0.4]{objective_c.png} 
\textbf{\Huge objective}\end{center}
  \large
}{}

%%%%%%%%%%%%%%%%%%%%
% List environment %
%%%%%%%%%%%%%%%%%%%%

\setlength{\tabcolsep}{0pt}
\newenvironment{entrylist}{%
  \begin{tabular*}{\textwidth}{@{\extracolsep{\fill}}ll}
}{%
  \end{tabular*}
}
\renewcommand{\bfseries}{\headingfont\color{headercolor}}
\newcommand{\entry}[4]{%
  {\large \addfontfeature{Color=darkgray}#1}&\parbox[t]{15.9cm}{%
    \textbf{{\large \addfontfeature{Color=darkgray}#2}}%
    \hfill%
    {\addfontfeature{Color=darkgray} #3}\\%
    {\large \addfontfeature{Color=darkgray}#4}\vspace{0.0cm}%\vspace{parsep}
  }\\}


%%%%%%%%%%%%%%
% Side block %
%%%%%%%%%%%%%%

\RequirePackage[absolute,overlay]{textpos}
\setlength{\TPHorizModule}{1cm}
\setlength{\TPVertModule}{1cm}
\newenvironment{aside}{%
  \let\oldsection\section
  \renewcommand{\section}[1]{
    \par\vspace{\baselineskip}{\Large\headingfont\color{headercolor} ##1}
  }
  \begin{textblock}{3.6}(1.5, 4.33)
  \begin{flushright}
  \obeycr
}{%
  \restorecr
  \end{flushright}
  \end{textblock}
  \let\section\oldsection
}

%%%%%%%%%%%%%%%%
% Bibliography %
%%%%%%%%%%%%%%%%

\RequirePackage[style=verbose, maxnames=99, sorting=ydnt, backend=biber]{biblatex}

\DeclareFieldFormat[article]{title}{#1\par}
\DeclareFieldFormat[book]{title}{#1\par}
\DeclareFieldFormat[inproceedings]{title}{#1\par}
\DeclareFieldFormat[misc]{title}{#1\par}
\DeclareFieldFormat[report]{title}{#1\par}

\DeclareBibliographyDriver{article}{%
  \printfield{title}%
  \newblock%
  \printnames{author}%
  \par%
  \newblock%
  {%
    \footnotesize\addfontfeature{Color=lightgray}\itshape%
    \usebibmacro{journal+issuetitle}%
    \setunit{\space}%
    \printfield{pages}%
    \newunit%
    \printlist{publisher}%
    \setunit*{\addcomma\space}%
    \printfield{year}%
    \newunit%
  }
  \par\vspace{0.3\baselineskip}
}

\DeclareBibliographyDriver{book}{%
  \printfield{title}%
  \newblock%
  \printnames{author}%
  \par%
  \newblock%
  {%
    \footnotesize\addfontfeature{Color=lightgray}\itshape%
    \printlist{publisher}%
    \setunit*{\addcomma\space}%
    \printfield{note}%
    \setunit*{\addcomma\space}%
    \printfield{year}%
    \setunit{\addcomma\space}%
    \printlist{location}%
    \newunit%
  }
  \par\vspace{0.3\baselineskip}
}


\DeclareBibliographyDriver{inproceedings}{%
  \printfield{title}%
  \newblock%
  \printnames{author}%
  \par%
  \newblock%
  {%
    \footnotesize\addfontfeature{Color=lightgray}%
    \printfield{booktitle}%
    \setunit{\addcomma\space}%
    \printfield{year}%
    \setunit{\addcomma\space}%
    \printlist{location}%
    \newunit%
  }
  \par\vspace{0.3\baselineskip}
}

\DeclareBibliographyDriver{misc}{%
  \printfield{title}%
  \newblock%
  \printnames{author}%
  \par%
  \newblock%
  {%
    \footnotesize\addfontfeature{Color=lightgray}\itshape%
    \printfield{booktitle}%
    \setunit*{\addcomma\space}%
    \printfield{note}%
    \setunit*{\addcomma\space}%
    \printfield{year}%
    \setunit{\addcomma\space}%
    \printlist{location}%
    \newunit%
  }
  \par\vspace{0.3\baselineskip}
}

\DeclareBibliographyDriver{report}{%
  \printfield{title}%
  \newblock%
  \printnames{author}%
  \par%
  \newblock%
  {%
    \footnotesize\addfontfeature{Color=lightgray}\itshape%
    \printfield{type}%
    \setunit{\space}%
    \printfield{number}%
    \setunit{\addcomma\space}%
    \printfield{year}%
    \newunit%
  }
  \par\vspace{0.3\baselineskip}
}

%\DeclareNameFormat{author}{%
  %\small\addfontfeature{Color=lightgray}%
  %\ifblank{#3}{}{#3\space}#1%
  %\ifthenelse{\value{listcount}<\value{liststop}}
    %{\addcomma\space}
    %{}%
%}

\defbibheading{bibheading}[\bibname]{%
   \subsubsection*{#1}
   \markboth{#1}{#1}
}

\newcommand{\printbibsection}[2]{
  \begin{refsection}
    \nocite{*}
    \printbibliography[sorting=chronological, type={#1}, title={#2}, heading=bibheading]
  \end{refsection}
}

\DeclareSortingScheme{chronological}{
  \sort[direction=descending]{\field{year}}
  \sort[direction=descending]{\field{month}}
}



%%%%%%%%%%%%%%%%
% Other tweaks %
%%%%%%%%%%%%%%%%

\RequirePackage[left=2cm,top=3cm,right=2cm,bottom=2cm,nohead,nofoot]{geometry}
\RequirePackage{hyperref}
\hypersetup{
    colorlinks=true,       
    linkcolor=blue,          
    citecolor=blue,        
    filecolor=blue,      
    urlcolor = darkblue}
    
% A fix for \href{}{} colors not working with fontspec
\makeatletter
\def\HyColor@@@@UseColor#1\@nil{\addfontfeatures{Color=#1}}
\makeatother