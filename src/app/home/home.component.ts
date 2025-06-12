import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild
} from '@angular/core'
import { TypingBoxComponent } from './feature/typingbox/typingbox.component'
import { GithubApiService } from './data-access/github-api/github-api.service'
import { GithubFormComponent } from './ui/github-form/github-form.component'
import { GameData } from './interface/GameData'

@Component({
  selector: 'app-home',
  imports: [TypingBoxComponent, GithubFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  text =
    signal<string>(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
Amet magni nisi a modi blanditiis, quo quidem, repudiandae provident harum voluptatem quisquam accusantium quas deserunt esse accusamus ad quasi suscipit culpa.`)
  typingBox = viewChild('typingBox', { read: TypingBoxComponent })
  gameResults?: GameData

  constructor(private githubApi: GithubApiService) {}

  githubButtonClick(route: string) {
    this.githubApi.getContentRequest(route).subscribe({
      next: (response) => this.text.set(response.data),
      error: (err) => alert(err)
    })
  }

  filePick(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const file = inputElement.files?.item(0)
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result)
        this.text.set(reader.result.toString().replaceAll('\r\n', '\n'))
    }

    reader.readAsText(file)
  }

  gameAnalysis(data: GameData) {
    this.gameResults = data
  }
}
