import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'

@Component({
  selector: 'github-form',
  imports: [FormsModule],
  templateUrl: './github-form.component.html',
  styleUrl: './github-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubFormComponent {
  route = output<string>()

  createRoute(form: NgForm) {
    const fields = form.value
    const route = `/repos/${fields.owner}/${fields.repository}/contents/${fields.filePath}?q=${fields.branch}`
    this.route.emit(route)
  }
}
